import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import SignInButton from './sign-in-button';

export default function Navbar() {
  const { user, handleSignOut } = useContext(AppContext);
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
    <div className='row navbar'>
      <div className='col-half inline'>
        <div className='center'>
          <i className='fa-solid fa-bars pl-10 dropdown ptb-20'>
            <div className='dropdown-content'>
              <a href='#all-images'>All Images</a>
              <a href='#top-images'>Top Images</a>
            </div>
          </i>
        </div>
        <div className='justify-around inline'>
          <a className={`${fromText} icon-wrapper`} href=''>
            <div className='center'>
              <i className="fa-regular fa-image" />
            </div>
            <p>From Text</p>
          </a>
          <div className={`${gallery} icon-wrapper`}>
            <a href="#my-gallery">
              <div className='center'>
                <i className="fa-regular fa-boxes-stacked" />
              </div>
              <p>Gallery</p>
            </a>
          </div>
          <div className={`${myLikes} icon-wrapper`}>
            <a href="#my-likes">
              <div className='center'>
                <i className="fa-regular fa-heart" />
              </div>
              <p>My Likes</p>
            </a>
          </div>
        </div>
      </div>
      <div className='col-half align-right'>
        <div>
          <SignInButton user={user} handleSignOut={handleSignOut}/>
        </div>
      </div>
    </div>
  );
}
