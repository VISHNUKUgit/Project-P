import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';


function ProjectCard() {
    // for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card className='shadow' onClick={handleShow} >
                <Card.Img variant="top" src="https://www.flexgigzz.com/wp-content/uploads/2021/04/bexer-bootstrap-business-template.jpg" />
                <Card.Body>
                    <Card.Title className='fw-bolder text-center'>Card Title</Card.Title>
                    <Card.Text>

                    </Card.Text>

                </Card.Body>
            </Card>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bolder'>Project Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-100 d-flex'>
                        <div className='w-50'>
                            <img className='w-100' src="https://www.flexgigzz.com/wp-content/uploads/2021/04/bexer-bootstrap-business-template.jpg" alt="" />
                        </div>
                        <div className='w-50'>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex'>
                        <a href="https://github.com/VISHNUKUgit/PortFolio"  target="_blank"><i class="fa-brands fa-github fa-lg m-3"></i></a>
                        <a href=""  target="_blank"><i class="fa-solid fa-link fa-lg m-3"></i></a>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard