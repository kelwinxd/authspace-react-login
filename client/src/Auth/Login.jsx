import React from 'react'
import {Card, Flex, Form, Typography, Input, Button, Spin, Alert} from 'antd'
import  LoginImg  from '../assets/astro2.png'
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {

  const {error,loading,loginUser} = useLogin()

  const handleLogin = (values) => {
     loginUser(values)
         
  }
  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
      <Flex align='center'>
        <img src={LoginImg} alt="" className='auth-img'/>
        </Flex>
        { /*Form*/ }
        <Flex vertical flex={1}>
         <Typography.Title level={3} strong className='title'>Sign in</Typography.Title>
         <Typography.Text type='secondary' strong className='slogan'>join us!</Typography.Text>
         <Form layout='vertical' onFinish={handleLogin} className='slogan' autoComplete='off'>
         
             

              {/* Email */}
              <Form.Item 
              label="Email"
              name='email'
              rules={
                [
                  {
                    required:true,
                    message:'please enter your email'
                  },
                  {
                    type:'email',
                    message:'Invalid email!'
                  }
                ]
              }
               validateTrigger="onBlur"
              >
               <Input placeholder='Email'/>
              </Form.Item>

                {/* Email */}
                <Form.Item 
              label="Password"
              name='password'
              rules={
                [
                  {
                    required:true,
                    message:'please enter your password'
                  }
                ]
              }
               validateTrigger="onBlur"
              >
              <Input.Password size='large' placeholder='Enter Your password'/>
              </Form.Item>

              {error && <Alert description={error} type='error' showIcon closable className='alert'/>}
              <Form.Item>
                <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType='submit'
                size='large'
                className='btn'
                >{loading ? <Spin /> : 'Sign In'}</Button>
              </Form.Item>

              <Form.Item>
                <Link to="/">
                <Button
                size='large'
                className='btn'
                >Create an Acount</Button>
                </Link>
              </Form.Item>
        </Form>
        </Flex>

        

       
    
      </Flex>
    </Card>
  )
}

export default Login