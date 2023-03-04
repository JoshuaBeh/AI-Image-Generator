import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

export default function Navbar() {
  const { user, handleSignOut } = useContext(AppContext);

  return (
    <div className='row navbar'>
      <div className='col-half inline'>
        <div className='center'>
          <i className='fa-solid fa-bars pl-10 dropdown ptb-20'>
            <div className='dropdown-content'>
              <a href='#all-images'>All Images</a>
              <a >Top Images</a>
            </div>
          </i>
        </div>
        <div className='justify-around inline'>
          <a className='icon-wrapper' href=''>
            <div className='center'>
              <i className="fa-regular fa-image" />
            </div>
            <p>From Text</p>
          </a>
          <div className='icon-wrapper'>
            <a href="">
              <div className='center'>
                <i className="fa-regular fa-boxes-stacked" />
              </div>
              <p>Gallery</p>
            </a>
          </div>
          <div className='icon-wrapper'>
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

function SignInButton({ user, handleSignOut }) {
  if (user) {
    return (
      <button className='sign-in-button' onClick={handleSignOut}>Sign Out</button>
    );
  }
  return (
    <a className='sign-in-button' href='#sign-in'>Sign In</a>
  );
}
