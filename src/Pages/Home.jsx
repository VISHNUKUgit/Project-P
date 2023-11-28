import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { getThreeProjects } from '../Service/allAPI'

function Home() {
  const [isLogged, setIsLogged] = useState(false)
  const [homeProjects, setHomeProjects] = useState([])

  const getHomeProjects = async () => {
    try {
      // Call the asynchronous function getThreeProjects
      const result = await getThreeProjects();

      if (result.status === 200) {
        setHomeProjects(result.data)
        console.log(result.data)
      } else {
        console.log(result);
      }


    } catch (error) {
      // Handle any errors that occurred during the execution of the asynchronous code
      console.error('Error fetching home projects:', error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogged(true)
    }
    else {
      setIsLogged(false)
    }
    getHomeProjects()
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: '100vh', }} className='container-fluid  bg-info'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{ fontSize: '80px' }} className='fw-bolder text-light'>
              <i class="fa-solid fa-code fa-fade fa-sm"></i>
              Project-Plethora
            </h1>
            <p className='fw-bolder'>One Stop Destination For all softWare Development projects. Where user can add and manage their projects. As well as access all projects avilable in our website... what are you waiting for!!!!</p>
            {isLogged ?
              <Link to={'/dashboard'} className='btn btn-warning'>
                Manage your projects
              </Link> :
              <Link to={'/login'} className='btn btn-warning'>
                Start to explore

              </Link>
            }
          </Col>
          <Col sm={12} md={6}>
            <img src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698105600&semt=ais" alt="" />
          </Col>
        </Row>
      </div>
      {/* All projects */}
      <div>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee behavior="" direction="">
          <Row>
            {homeProjects?.length > 0 ? (
              homeProjects.map((project) => (
                <Col key={project.id} sm={12} md={6} lg={4}>
                  <ProjectCard project={project} />
                </Col>
              ))
            ) : (
              <p>projects are Loading....</p>
            )}
          </Row>

        </marquee>
        <div className='text-center mt-4'>
          <Link to={'/projects'}>
            View more Projects
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home