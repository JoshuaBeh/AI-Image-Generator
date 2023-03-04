import React from 'react';

export default function MobileNavbar() {
  return (
    <footer className='container'>
      <div className='row mobile-navbar'>
        <div className='col-full inline space-around'>
          <a className='' href=''>
            <div className='center'>
              <i className="fa-regular fa-image" />
            </div>
            <p>From Text</p>
          </a>
          <div className=''>
            <a href="">
              <div className='center'>
                <i className="fa-regular fa-boxes-stacked" />
              </div>
              <p>Gallery</p>
            </a>
          </div>
          <div className=''>
            <a href="#my-likes">
              <div className='center'>
                <i className="fa-regular fa-heart" />
              </div>
              <p>My Likes</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
