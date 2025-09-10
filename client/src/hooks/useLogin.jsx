import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'

const useLogin = () => {

  const {Login} = useAuth()
  const [error,setError] = React.useState(null)
  
  const [loading,setLoading] = React.useState(null)
  
  const loginUser = async (values) => {
        
    
        try {
            setError(null)
            setLoading(true)
            const res = await fetch('http://localhost:5000/api/auth/login', {
              method:'POST',
              headers: {
                'Content-Type':'application/json',
              },
              body:JSON.stringify(values),
            })

            const data = await res.json()
            if(res.status===200){
              message.success(data.message)
              Login(data.token,data.user)
              
            }
            else if(res.status === 400){
              setError(data.message)
            } else {
              message.error('registration failed')
            }
            
          }
          catch (error) {
            message.error('Login failed')
          }finally {
            setLoading(false)
          }
  }


  return {loading,error,loginUser}
}

export default useLogin