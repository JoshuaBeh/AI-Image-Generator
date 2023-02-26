import React from 'react';

export default function Navbar(props) {
  return (
    <div className='row navbar'>
      <div className='col-half inline'>
        <div className='center'>
          <i className='fa-solid fa-bars pl-10' />
        </div>
        <div className='justify-around inline'>
          <a className='icon-wrapper' href=''>
            <div className='center'>
              <i className="fa-regular fa-image" />
            </div>
            <p>From Text</p>
          </a>
          <div className='icon-wrapper'>
            <div className='center'>
              <i className="fa-regular fa-boxes-stacked" />
            </div>
            <p>Gallery</p>
          </div>
          <div className='icon-wrapper'>
            <div className='center'>
              <i className="fa-regular fa-heart" />
            </div>
            <p>My Likes</p>
          </div>
        </div>
      </div>
      <div className='col-half align-right'>
        <div>
          <a className='sign-in-button' href='#sign-in'>Sign In</a>
        </div>
      </div>
    </div>
  );
}
