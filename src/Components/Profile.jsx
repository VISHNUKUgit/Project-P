import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);
    return (
        <div className='card shadow p-3'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h3>My profile</h3>
                <Button className='btn btn-info' style={{border:'none'}}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    <i class="fa-solid fa-chevron-down fa-lg"></i>
                </Button>

            </div>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <div className=''>
                        <label className='text-center' htmlFor="profile">
                            <input id='profile' style={{ display: 'none' }} type="file" />
                            <img className='w-50' style={{ borderRadius: '50%' }} src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input type="text" className='form-control' placeholder='GitHub' />
                    </div>
                    <div className='mt-2'>
                        <input type="text" className='form-control' placeholder='LinkedIn' />
                    </div>
                </div>
            </Collapse>

        </div>
    )
}

export default Profile