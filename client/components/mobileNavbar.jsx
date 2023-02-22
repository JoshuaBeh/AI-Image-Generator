import React from 'react';

export default function MobileNavbar() {
  return (
    <footer className='container'>
      <div className='row mobile-navbar'>
        <div className='col-full inline space-around'>
          <div className=''>
            <div className='center'>
              <i className="fa-regular fa-image" />
            </div>
            <p>From Text</p>
          </div>
          <div className=''>
            <div className='center'>
              <i className="fa-regular fa-boxes-stacked" />
            </div>
            <p>Gallery</p>
          </div>
          <div className=''>
            <div className='center'>
              <i className="fa-regular fa-heart" />
            </div>
            <p>My Likes</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
