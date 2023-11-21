import React from 'react'
import AddProjects from './AddProjects'

function MyProjects() {
    return (
        <div className='card shadow p-3'>
            <div className='d-flex'>
                <h3>My projects</h3>
                <div className='ms-auto'><AddProjects /></div>
            </div>
            <hr />
            <div className='d-flex'>
                <h4>project Title</h4>
                <div className='ms-auto'>
                    <button className='btn'> <i class="fa-regular fa-pen-to-square fa-lg"></i></button>
                    <button className='btn'> <i class="fa-solid fa-trash fa-lg"></i></button>
                    <button className='btn'> <i class="fa-brands fa-github fa-lg"></i></button>
                </div>
            </div>
            <hr />
            <p className='text-warning fw-bolder'>No Projects Uploaded yet!!!</p>
        </div>
    )
}

export default MyProjects