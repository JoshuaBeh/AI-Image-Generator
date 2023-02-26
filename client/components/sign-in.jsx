import React from 'react';

export default function SignIn() {
  return (
    <div className='row'>
      <div className='col-full center flex-column'>
        <h1 className='green'>Sign In</h1>
        <input type="text" name='' id='' />
        <input type="text" name='' id='' />
        <button>Sign In</button>
        <h4 className='white'>
          Don&apos;t have an account?
          <a href="#sign-up" className='green'>Sign up</a>
        </h4>
      </div>
    </div>
  );
}
