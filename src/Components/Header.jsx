import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Header({insideDashboard}) {
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
                    <h5>Logout</h5>
                </div>}
            </Container>
        </Navbar>
    )
}

export default Header