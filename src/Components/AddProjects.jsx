import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Service/allAPI';
import { addProjectResponseContext } from '../Context/ContextShare';


function AddProjects() {
  const{addProjectResponse,setaddProjectResponse} = useContext(addProjectResponseContext)
  // use same variable name for 
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setProjectDetails({
      title: "",
      languages: "",
      github: "",
      website: "",
      overview: "",
      projectImg: null
    })
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const defaultImgSrc = "https://design102.blog.gov.uk/wp-content/uploads/sites/163/2022/01/D102-Blog-post_Alt-text_main-image.png";
  // store project Details
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    languages: "",
    github: "",
    website: "",
    overview: "",
    projectImg: null
  })
  // console.log(projectDetails);
  const [token,setToken]= useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
       setToken(sessionStorage.getItem("token"))
       
    }else{
      setToken("")
    }
  },[])
  const handleAdd = async () => {
    const { title, languages, github, website, overview, projectImg } = projectDetails
    if (!title || !languages || !github || !website || !overview || !projectImg) {
      toast.info("please fill all")
    }
    else
    
    try {
      const reqBody = new FormData()
    
    reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImg",projectImg)
      // console.log(token);
      if (token) {
          const reqHeader = {
          "Content-Type":"multipart/from-data",
          "Authorization":`Bearer ${token}`
        }
        console.log("reqH",reqHeader);
        const result = await addProjectAPI(reqBody,reqHeader)
      console.log(result);
        if (result.status===200) {
          console.log(result.data);
          handleClose()
          setaddProjectResponse(result.data)
          toast.success("projected added successfully")
          
        }
        else{
          console.log(result.response.data);
          toast.error("Error during Adding project:",result.response.data)
        }
        }
      

    } catch (error) {
      toast.error("Error  Adding project Api:", error);
    }
  }
  // console.log(projectDetails.projectImg);
    return (
      <div>
        <Button variant="info" onClick={handleShow}>
          Add Projects
        </Button>

        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Project Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className='d-flex w-100'>
            <div className='p-2 w-50'>
              <label htmlFor="projectImg">
                <input style={{ display: 'none' }} type="file" name="" id="projectImg" onChange={(e) => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} />

                <img className='w-100' src={projectDetails.projectImg ? URL.createObjectURL(projectDetails.projectImg) : defaultImgSrc} alt="" />

              </label>
            </div>
            <div className='p-2 w-50' >
              <input className='m-2 form-control' type="text" placeholder='project title' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              <input className='m-2 form-control' type="text" placeholder='Languages Used' value={projectDetails.languages} onChange={(e) => setProjectDetails({ ...projectDetails, languages: e.target.value })} />
              <input className='m-2 form-control' type="text" placeholder='GitHub Link' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              <input className='m-2 form-control' type="text" placeholder='Website Link' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              <input className='m-2 form-control' type="text" placeholder='Project Overview' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />

            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={(e) => handleAdd(e)} variant="primary">ADD</Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      </div>
    )
  }

  export default AddProjects