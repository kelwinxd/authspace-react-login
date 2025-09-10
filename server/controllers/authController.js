const User = require('../models/userModels')
const createError = require('../utils/appError')
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken')


//Register User
exports.signup = async (req, res, next) => {
    try {
      // Verificando se o usuário já existe
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return next(new createError('User already exists', 400))
      }
  
      // Criptografando a senha
      const hashedPass = await bycript.hash(req.body.password, 12)
  
      // Criando o novo usuário
      const newUser = await User.create({
        ...req.body,
        password: hashedPass,
      })
  
      // Gerando token de acesso
      const token = jwt.sign(
        { _id: newUser._id },
        'secretkey123',
        { expiresIn: '90d' }
      )
  
      // Retornando o token e as informações do usuário
      res.status(201).json({
        status: 'success',
        message: 'User Registered',
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      })
    } catch (error) {
      next(error)
    }
  }



//loggin User

exports.login = async (req,res,next) => {
        try {
          const {email, password} = req.body;
          const user = await User.findOne({email})

          if(!user) return next(new createError("User not found",400))

          const isPasswordValid = await bycript.compare(password,user.password)

          if(!isPasswordValid){
            return next(new createError('Incorrect email or password',401))
          }
  //gerar token de acesso
         const token = jwt.sign(
        {_id:user._id},
        'secretkey123',
        {expiresIn:'90d'})
        res.status(200).json({
            status:'success',
            token,
            message:'Logged in successfully',
            user: {
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token
            }
        })


        } catch(error) {
               next(error)
        }
}