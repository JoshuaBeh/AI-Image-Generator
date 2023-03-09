import React from 'react';

export default function SignInButton({ user, handleSignOut }) {
  if (user) {
    return (
      <a href="#sign-in">
        <button className='sign-in-button' onClick={handleSignOut}>Sign Out</button>
      </a>
    );
  }
  return (
    <a className='sign-in-button' href='#sign-in'>Sign In</a>
  );
}
