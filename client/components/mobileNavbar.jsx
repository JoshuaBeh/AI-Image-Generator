import React from 'react';

export default function MobileNavbar() {
  const hash = window.location.hash;
  const underline = {
    allImages: '',
    fromText: '',
    myLikes: '',
    gallery: ''
  };
  let { fromText, myLikes, gallery } = underline;
  if (hash === '') {
    fromText = 'underline';
  }
  if (hash === '#my-likes') {
    myLikes = 'underline';
  }
  if (hash === '#my-gallery') {
    gallery = 'underline';
  }

  return (
    <footer className='container'>
      <div className='row mobile-navbar'>
        <div className='col-full inline space-around'>
          <a className={fromText} href=''>
            <div className='center'>
              <i className="fa-regular fa-image" />
            </div>
            <p>From Text</p>
          </a>
          <div className={gallery}>
            <a href="#my-gallery">
              <div className='center'>
                <i className="fa-regular fa-boxes-stacked" />
              </div>
              <p>Gallery</p>
            </a>
          </div>
          <div className={myLikes}>
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
