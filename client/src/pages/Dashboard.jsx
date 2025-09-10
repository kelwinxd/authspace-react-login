import { Button, Card, Flex, Avatar, Typography} from 'antd'
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import {UserOutlined} from '@ant-design/icons'

const Dashboard = () => {

  const {logout, userData} = useAuth()
  if (!userData) {
    return <Typography.Text>Loading user data...</Typography.Text>
  }
  return (
    <>
    <Card className='card'>
      <Flex vertical gap="small" className='flex'>
        <Avatar size={150} icon={<UserOutlined />} className='avatar'/>
     <Typography.Title level={2} strong className='username'>{userData.name}</Typography.Title>
     <Typography.Text type='secondary' strong>Email: {userData.email}</Typography.Text>
      <Button onClick={logout} type='primary'>Logout</Button>
      </Flex>
 
    </Card>
  
    </>
   

  )
}

export default Dashboard