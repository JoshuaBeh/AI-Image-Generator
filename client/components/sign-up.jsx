import React from 'react';

export default function SignUp({ username, setUsername, password, setPassword, user, handleSignIn }) {

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
          <h1 className='green'>Sign Up</h1>
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
          <button type='submit'>Sign Up</button>
          <h4 className='white'>
            Already have an account?
            <a href="#sign-in" className='green'>Sign in</a>
          </h4>
        </div>
      </div>
    </form>
  );
}
