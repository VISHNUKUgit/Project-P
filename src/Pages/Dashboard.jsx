import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'
import UserDataProvider from '../Context/UserDataProvider'

function Dashboard() {
  const [username,setUsername] = useState("user")
  
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser"))
    {
setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  return (
    <div className=''>
      <Header insideDashboard />
      <div className='' style={{marginTop:'100px'}}>
        <h2 className='px-5 py-3'>Welcome <span className='text-primary fw-bolder'>{username}</span></h2>
      </div>
      <div className='d-flex p-3 w-100'>
          <div className='w-75 px-3'>
           <MyProjects />
          </div>
          <div className='w-25'>
            <UserDataProvider>
              <Profile />
            </UserDataProvider>
          </div>
      </div>
    </div>
  )
}

export default Dashboard