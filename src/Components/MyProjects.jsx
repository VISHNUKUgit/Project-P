import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { deleteAProject, getUserProjects } from '../Service/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare'
import EditProject from './EditProject'

function MyProjects() {
    const{addProjectResponse,setaddProjectResponse} = useContext(addProjectResponseContext)
    const {editProjectResponse,setEditProjectresponse} = useContext(editProjectResponseContext)
    const [userProjects,setUserProjects] = useState([])

  // API call to get user projects
  const getProjectData = async ()=>{
    if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
        const result = await getUserProjects(reqHeader)
        if (result.status===200) {
            setUserProjects(result.data)
        }else{
            alert(result.response.data)
            console.log(result.response.data);
        }
    }
     
  }
  useEffect(()=>{
    getProjectData()
  },[addProjectResponse,editProjectResponse])
   

  const handleDeleteProject = async(projectId) => {
    console.log(projectId);
    if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        console.log(token);
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await deleteAProject(projectId, reqHeader);

            if (result && result.status === 200) {
                console.log(result.data);
                getProjectData();
            } else {
                console.error("Failed to delete project. Status:", result.response ? result.response.status : "Unknown");
                console.error("Error details:", result.response ? result.response.data : "No response data");
            }
        } catch (error) {
            console.error("Error deleting project:", error);

            // Additional logging to identify the response content causing the error
            if (error.response && error.response.data) {
                console.error("Error response data:", error.response.data);
            }
        }
    }
};

console.log(userProjects);
    return (
        <div className='card shadow p-3'>
            <div className='d-flex'>
                <h3>My projects</h3>
                <div className='ms-auto'><AddProjects /></div>
            </div>
            <hr />
            {userProjects.length>0?userProjects.map((project,index)=>(<div key={index}>
            <div className='d-flex' >
                <h4>{project.title}</h4>
                <div className='ms-auto d-flex'>
                    {/* <button className='btn'> <i class="fa-regular fa-pen-to-square fa-lg"></i></button> */}
                    <EditProject details={project}/>
                    <button className='btn' onClick={()=>handleDeleteProject(project._id)}> <i class="fa-solid fa-trash fa-lg"></i></button>
                    <a href={project.github} target='_blank' className='btn'> <i class="fa-brands fa-github fa-lg"></i></a>
                </div>
            </div>
            <hr />
            
            </div>)):<p className='text-warning fw-bolder'>No Projects Uploaded yet!!!</p>
            }           
        </div>
    )
}

export default MyProjects