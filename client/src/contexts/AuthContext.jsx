import {createContext,useContext, useEffect, useState} from 'react'



const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [isReg, setIsReg] = useState(false)
    const storedData = JSON.parse(localStorage.getItem('user_data'))

    useEffect(() => {
        if (storedData) {
          const { userToken, user } = storedData;  // Mantenha a mesma chave que foi salva
          setToken(userToken);
          setUserData(user);
          setIsAuth(true);
          setIsReg(true)
        }
      }, []);

    const Login = (newToken, newData) => {
        localStorage.setItem('user_data', JSON.stringify({
          userToken: newToken,  // Use 'userToken' para manter consistência
          user: newData         // Use 'user' para os dados do usuário
        }));
      
        setToken(newToken);
        setUserData(newData);
        setIsAuth(true);
      };

    const logout = () => {
        localStorage.removeItem('user_data')
        setToken(null)
        setUserData(null)
        setIsAuth(false)
      
    }
    return   <AuthContext.Provider value={{ token, isAuth, userData, Login, logout }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)