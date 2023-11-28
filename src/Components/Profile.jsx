import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from "./baseURL"

function Profile() {
    
    const [open, setOpen] = useState(false);

    const [userProfile,setUserProfile] = useState({
        username:"",
        email:"",
        password:"",
        profile:'',
        github:"",
        linkedin:""
    })
    const[existingImg,setExistingImg] = useState("")
    const[preview,setPreview] = useState("")
    useEffect(()=>{
        // const user = sessionStorage.getItem("existingUser")
        // console.log(user);
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
        setExistingImg(user.profile)
    },[])
    return (
        <div className='card shadow p-3'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h3>My profile</h3>
                <Button className='btn btn-info' style={{border:'none'}}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    <i class="fa-solid fa-chevron-down fa-lg"></i>
                </Button>

            </div>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <div className=''>
                        <label className='text-center' htmlFor="profile">
                            <input id='profile' style={{ display: 'none' }} type="file" />
                            <img className='w-50' style={{ borderRadius: '50%' }} src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                            {
                                existingImg!==""?
                                <img src={preview?preview:`${BASE_URL}/FOLDER/${existingImg}`} alt="" />
                            }
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input type="text" className='form-control' placeholder='GitHub' />
                    </div>
                    <div className='mt-2'>
                        <input type="text" className='form-control' placeholder='LinkedIn' />
                    </div>
                </div>
            </Collapse>

        </div>
    )
}

export default Profile