import React from 'react';

export default function Registerscreen() {
  return (
    <div>
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div>
                    <input type="text" placeholder='Name' className='form-control' />
                    <input type="text" placeholder='Email' className='form-control' />
                    <input type="text" placeholder='Password' className='form-control' />
                    <input type="text" placeholder='Confirm password' className='form-control' />
                </div>
            </div>
        </div>
    </div>
  )
}
