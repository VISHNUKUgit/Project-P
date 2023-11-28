import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer,toast} from 'react-toastify';
import { BASE_URL } from '../Service/baseURL';
import { updateProject } from '../Service/allAPI';
import { editProjectResponseContext } from '../Context/ContextShare';
function EditProject({details}) {
  const {editProjectResponse,setEditProjectresponse} = useContext(editProjectResponseContext)
    const defaultImgSrc = "https://design102.blog.gov.uk/wp-content/uploads/sites/163/2022/01/D102-Blog-post_Alt-text_main-image.png";
    const [preview,setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleClose =()=> {setShow(false)
      setProjectDetails({
        id:details._id,
        title: details.title,
        languages: details.languages,
        github: details.github,
        website: details.website,
        overview: details.overview,
        projectImg: null
      })
      setPreview("")
    };
    const handleShow =()=> setShow(true);
    const [projectDetails, setProjectDetails] = useState({
        id:details._id,
        title: details.title,
        languages: details.languages,
        github: details.github,
        website: details.website,
        overview: details.overview,
        projectImg: null
      })

      useEffect(()=>{
        // console.log("file",projectDetails.projectImg);
        if(projectDetails.projectImg){
          setPreview(URL.createObjectURL(projectDetails.projectImg))
        }
      },[projectDetails.projectImg])
    // console.log("img",preview);
    const handleUpdate = async ()=>{
      const {id,title,languages,github,website,overview,projectImg} = projectDetails
      if (!id||!title||!languages||!github||!website||!overview) {
        toast.info("please fill all")
      } else {
        const reqBody = new FormData()
        reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",details.projectImg)
      const token = sessionStorage.getItem("token")
      if (preview) {
        const reqHeader = {
          "Content-Type":"multipart/from-data",
          "Authorization":`Bearer ${token}`
        }
        // API call
        const result = await updateProject(id,reqBody,reqHeader)
        if (result.status===200) {
          handleClose()
          alert("success")
          // pass response to my project
          setEditProjectresponse(result.data)
        }else{
          console.log(result);
          toast.error(result.response.data)
        }
        
      } else {
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // API call
        const result = await updateProject(id,reqBody,reqHeader)
        if (result.status===200) {
          handleClose()
          // pass response to my project
          setEditProjectresponse(result.data)
        }else{
          console.log(result);
          toast.error(result.response.data)
        }
        
      }
      }
    }
      
  return (
    <div>
        
        <button className='btn' onClick={handleShow}> <i class="fa-regular fa-pen-to-square fa-lg"></i></button>
        
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
                <input style={{ display: 'none' }} type="file" name="" id="projectImg"  onChange={(e)=>setProjectDetails({
                  ...projectDetails,projectImg:e.target.files[0]
                })} />

                <img className='w-100' src={preview?preview:`${BASE_URL}/Folder/${details.projectImg}`} alt="" />

              </label>
            </div>
            <div className='p-2 w-50' >
              <input className='m-2 form-control' type="text" placeholder='project title' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}  />
              <input className='m-2 form-control' type="text" placeholder='Languages Used' value={projectDetails.languages} onChange={(e) => setProjectDetails({ ...projectDetails, languages: e.target.value })}  />
              <input className='m-2 form-control' type="text" placeholder='GitHub Link' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              <input className='m-2 form-control' type="text" placeholder='Website Link' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              <input className='m-2 form-control' type="text" placeholder='Project Overview' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} />

            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button  variant="primary" onClick={handleUpdate}>Update</Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </div>
  )
}

export default EditProject