import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjects } from '../Service/allAPI'

function Projects() {
  const [allProjectData, setAllProjectData] = useState([])
  const [searchValue,setSearchValue] = useState("")
  const getallProjectApi = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllProjects(searchValue,reqHeader)
        if (result.status === 200) {
          setAllProjectData(result.data)

        } else {
          console.log(result);
        }
      } catch (error) {
        console.log("api call error:", error);
      }

    }
  }
  useEffect(() => {
    getallProjectApi()
  }, [searchValue])
  // Search
  
  return (
    <div>
      <Header />
      <div style={{ marginTop: '100px' }} className='projects'>
        <h1 className='text-center mb-5'>All projects</h1>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <div className='d-flex border w-50 rounded'>
            <input type="text" className='form-control' placeholder='Search projects by technology ' value={searchValue||""} onChange={(e)=>setSearchValue(e.target.value)} />
            <i style={{ marginLeft: '-50px' }} class="fa-solid fa-magnifying-glass fa-rotate-90 fa-sm"></i>
          </div>
        </div>
        <Row className='py-5 mx-5'>
          {
            allProjectData.length>0?allProjectData.map((project)=>(<Col sm={12} md={6} lg={4}>
              <ProjectCard project={project}/>
            </Col>)):<h1>Projects are not avilable......</h1>
          } 
        </Row>
      </div>
    </div>
  )
}

export default Projects