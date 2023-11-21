import React from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'

function Projects() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '100px' }} className='projects'>
        <h1 className='text-center mb-5'>All projects</h1>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <div className='d-flex border w-50 rounded'>
            <input type="text" className='form-control' placeholder='Search projects by technology '/>
            <i style={{marginLeft:'-50px'}} class="fa-solid fa-magnifying-glass fa-rotate-90 fa-sm"></i>
          </div>
        </div>
        <Row className='py-5 mx-5'>
          <Col sm={12} md={6} lg={4}>
            <ProjectCard/>
          </Col>
          
        </Row>
      </div>
    </div>
  )
}

export default Projects