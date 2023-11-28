import React, { useState } from 'react'
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';


function ProjectCard({project}) {
    
    // for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card className='shadow' onClick={handleShow} >
            <Card.Img style={{height:"250px"}} variant="top" src={project ?`http://localhost:4000/Folder/${project.projectImg}`:""} />

                <Card.Body>
                <Card.Title className='fw-bolder text-center'>{project ? project.title : 'No Title'}</Card.Title>

                    {/* <Card.Text>

                    </Card.Text> */}

                </Card.Body>
            </Card>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bolder'>Projects Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-100 d-flex'>
                        <div className='w-50'>
                            <img className='w-100' src={project ?`http://localhost:4000/Folder/${project.projectImg}`:""} alt="" />
                        </div>
                        <div className='w-50 px-2'>
                        <h2 className='fw-bolder'>{project ? project.title : 'No Title'}</h2>
                            <h6><span className='fw-bolder'>Project overview: </span>{project ? project.overview : 'No Project overview '}</h6>
                            <p><span className='fw-bolder'>Languages used: </span>{project ? project.languages : 'No data '}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex'>
                        
                        <a href={project ? project.github:""}  target="_blank"><i class="fa-brands fa-github fa-lg m-3"></i></a>
                        <a href={project ? project.website:""}  target="_blank"><i class="fa-solid fa-link fa-lg m-3"></i></a>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard