import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorisationContext } from '../Context/TokenAuthContext'
function Header({insideDashboard}) {
    const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorisationContext)
    const navigate = useNavigate()
    const handleLogout = ()=>{
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        setIsAuthorized(false)
        navigate('/')
    }
    return (
        <Navbar className='bg-info position-fixed top-0 w-100 ' style={{zIndex:'1'}}>
            <Container>
                <Navbar.Brand>
                    <h3>
                        <Link to={"/"} style={{ textDecoration: "none" }} className='fw-bold'>
                          <i class="fa-solid fa-code fa-fade fa-sm"></i>{' '}
                        Project-Plethora
                        </Link>
                    </h3>
                </Navbar.Brand>
                {insideDashboard && <div>
                    <h5 onClick={handleLogout} style={{cursor:'pointer'}}>Logout</h5>
                </div>}
            </Container>
        </Navbar>
    )
}

export default Header