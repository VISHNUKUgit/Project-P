// import { log } from 'console'
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerUser } from '../Service/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthorisationContext } from '../Context/TokenAuthContext';


function Auth({ register }) {
    const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorisationContext)
    const navigate = useNavigate()
    const isRegisterForm = register?true:false
    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
    const handleRegister = async(e)=>{ 
       e.preventDefault();
       const {username,email,password} = userData
       if(!username || !email ||!password){
        toast.info("please fill all")
       }
       else
       
    
       try {
        console.log("Sending data to server:", userData);
        const result = await registerUser(userData);
        console.log("Response from server:", result);

        if (result.status === 200) {
            toast.success(`${result.data.username} has registered successfully`);
            setUserData({ username: "", email: "", password: "" });
            navigate('/login');
        } 
        else {
            toast.error(result.response.data);
            toast.error("Registration failed");
        }
    } catch (error) {
        toast.error("Error during registration:", error);
    }
}

    // Login
    const handlelogin = async(e)=>{
        e.preventDefault();
        const {email,password} = userData
       if(!email ||!password){
        toast.info("please fill all")
       }
       else
        try {
            const result = await loginAPI(userData)
            console.log("Response from server:", result);
            if (result.status === 200) {
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",JSON.stringify(result.data.token))
                setIsAuthorized(true)
                setUserData({email: "", password: "" });
                navigate('/');
            } 
            else {
                toast.error("Login failed:",result.response.data);
            }
        } catch (error) {
            
        }
    }
   
    
    return (
        <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}>
                    Back to Home
                </Link>
                <div className='card shadow p-5 bg-success rounded'>
                    <div className="row align-items-center">
                        <div className='col-lg-6'>
                            <img className='w-100' src=" https://www.globalsign.com/application/files/1216/2130/8053/ManagedPKI_Banner_Authentication_Blog_3_APAC_.png" alt="" />
                        </div>
                        <div className='col-lg-6'>
                            <div className='d-flex justify-content-center align-items-center flex-column text-light'>
                                <h3 className='fw-bolder'>
                                    <i class="fa-solid fa-code fa-fade fa-sm"></i>{' '}
                                    Project-Plethora
                                </h3>
                                <span className='fw-bolder'>{isRegisterForm ? 'Sign-up' : 'Sign-in'} to your account</span>
                            </div>
                            <Form className='text-light w-100 mt-3'>
                                {
                                    isRegisterForm ?
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="UserName" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
                                    </Form.Group>:''
                                }
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Email" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="password" placeholder="Enter Password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  />
                                </Form.Group>
                                {
                                    isRegisterForm ?
                                    <div>
                                        <button className='btn btn-light' 
                                        onClick={(e)=>handleRegister(e)}
                                        >
                                            Register
                                        </button>
                                        <p>Already have an account? Click here to <Link to={'/login'}>Login</Link>  </p>
                                    </div>:
                                    <div>
                                         <button onClick={(e)=>handlelogin(e)} className='btn btn-light'>
                                            Log-in
                                        </button>
                                        <p>New user? Click here to <Link to={'/register'}>Register</Link>  </p>
                                    </div>
                            
                                }

                            </Form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} theme="colored" />
        </div>
    )
}

export default Auth