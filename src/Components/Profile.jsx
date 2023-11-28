import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../Service/baseURL';
import { toast } from 'react-toastify';
import { updateProfileApi } from '../Service/allAPI';



function Profile() {

    const [open, setOpen] = useState(false);

    const [userProfile, setUserProfile] = useState({
        username: "",
        email: "",
        password: "",
        profile: "",
        github: "",
        linkedin: ""
    })
    const [existingImg, setExistingImg] = useState("")
    const [preview, setPreview] = useState("")
    useEffect(() => {


        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        // console.log(user);
        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, profile: "", github: user.github, linkedin: user.linkedin })
        setExistingImg(user.profile)
    }, [open])

    useEffect(() => {
        if (userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        }
    }, [userProfile])
    // update function 
    const handleUpdateProfile = async () => {
        const { github, linkedin, username, email, password, profile } = userProfile
        if (!github || !linkedin) {
            toast.error("please fill git and linked-In")
        }
        else {
            const reqBody = new FormData()

            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            preview ? reqBody.append("profile", profile) : reqBody.append("profile", existingImg)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/from-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProfileApi(reqBody, reqHeader)
                if (result.status === 200) {
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setOpen(!open)
                    toast.success("updated successfully")

                } else {
                    setOpen(!open)
                    console.log(result.response.data);
                }
            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateProfileApi(reqBody, reqHeader)
                if (result.status === 200) {
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                    setOpen(!open)
                    toast.success("updated successfully")

                } else {
                    setOpen(!open)
                    console.log(result.response.data);
                }

            }
        }
    }
    return (
        <div className='card shadow p-3'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h3>My profile</h3>
                <Button className='btn btn-info' style={{ border: 'none' }}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    <i class="fa-solid fa-chevron-down fa-lg"></i>
                </Button>

            </div>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <div className='d-flex justify-content-center align-items-center'>
                        <label className='text-center' htmlFor="profile">
                            <input id='profile' style={{ display: 'none' }} type="file" onChange={e => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                            {/* <img className='w-50' style={{ borderRadius: '50%' }} src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" /> */}
                            {
                                existingImg !== "" ?
                                    <img className='w-50' style={{ borderRadius: '50%', cursor: 'pointer' }} src={preview ? preview : `${BASE_URL}/FOLDER/${existingImg}`} alt="" />
                                    :
                                    <img className='w-50' style={{ borderRadius: '50%', cursor: 'pointer' }} src={preview ? preview : `https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png`} alt="" />
                            }
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input type="text" className='form-control' value={userProfile.github} placeholder='GitHub' onChange={e => setUserProfile({ ...userProfile, github: e.target.value })} />
                    </div>
                    <div className='mt-2'>
                        <input type="text" className='form-control' value={userProfile.linkedin} placeholder='LinkedIn' onChange={e => setUserProfile({ ...userProfile, linkedin: e.target.value })} />
                    </div>
                    <button onClick={handleUpdateProfile} className='btn btn-warning mt-2 w-100'> update</button>
                </div>
            </Collapse>

        </div>
    )
}

export default Profile