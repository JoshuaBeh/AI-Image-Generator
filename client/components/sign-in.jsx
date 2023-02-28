import React from 'react';

export default function SignIn({ username, setUsername, password, setPassword, user, handleSignIn }) {

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
        if (data.user && data.token) {
          handleSignIn(data);
          window.location.hash = '';
        }
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-full center flex-column'>
          <h1 className='green'>Sign In</h1>
          <input
         onChange={event => setUsername(event.target.value)}
         required
         autoFocus
         type="text"
         name='username'
         id='username'
         placeholder='Username' />
          <input
         onChange={event => setPassword(event.target.value)}
         required
         type="password"
         name='password'
         id='password'
         placeholder='Password' />
          <button type='submit'>Sign In</button>
          <h4 className='white'>
            Don&apos;t have an account?
            <a href="#sign-up" className='green'>Sign up</a>
          </h4>
        </div>
      </div>
    </form>
  );
}
