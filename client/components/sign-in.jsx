import React, { useState } from 'react';

export default function SignIn({ username, setUsername, password, setPassword, user, handleSignIn }) {
  const [error, setError] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };
    fetch('/sign-in', req)
      .then(response => response.json())
      .then(data => {
        if (data.error === 'invalid login') {
          setError(true);
        }
        if (data.user && data.token) {
          handleSignIn(data);
          window.location.hash = '';
        }
      });
  }
  function demoButton(event) {
    setUsername('Admin');
    setPassword('Admin');
    handleSubmit(event);
  }
  const invalidLogin = error ? '' : 'hidden';
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-full center flex-column relative'>
          <h1 className='green mt-6'>Sign In</h1>
          <input
         className='sign-in-input mt-1'
         onChange={event => {
           setUsername(event.target.value);
           setError(false);
         }}
         required
         autoFocus
         type="text"
         name='username'
         id='username'
         placeholder='Username' />
          <input
         className='sign-in-input'
         onChange={event => {
           setPassword(event.target.value);
           setError(false);
         }}
         required
         type="password"
         name='password'
         id='password'
         placeholder='Password' />
          <button type='submit' className='sign-in-up-button mt-2'>Sign In</button>
          <h4 className='white mt-2'>
            Don&apos;t have an account?
            <a href="#sign-up" className='green'>&nbsp;Sign up</a>
          </h4>
          <button onClick={demoButton} className='sign-in-up-button mt-1'>Demo</button>
          <p className={`${invalidLogin} red absolute bad-login`}>Invalid Login!</p>
        </div>
      </div>
    </form>
  );
}
