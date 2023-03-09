import React, { useState } from 'react';

export default function SignUp({ username, setUsername, password, setPassword, user, handleSignIn }) {
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
    fetch('/sign-up', req)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(true);
          return;
        }
        window.location.hash = 'sign-in';
        if (data.user && data.token) {
          handleSignIn(data);
          window.location.hash = '';
        }
      });
  }

  const invalidLogin = error ? '' : 'hidden';
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-full center flex-column relative'>
          <h1 className='green mt-6'>Sign Up</h1>
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
          <button type='submit' className='sign-in-up-button mt-2'>Register</button>
          <h4 className='white mt-2'>
            Already have an account?
            <a href="#sign-in" className='green'>&nbsp;Sign in</a>
          </h4>
          <p className={`${invalidLogin} red absolute bad-login`}>Username already exists!</p>
        </div>
      </div>
    </form>
  );
}
