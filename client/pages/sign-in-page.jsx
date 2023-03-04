import React, { useContext } from 'react';
import SignIn from '../components/sign-in';
import AppContext from '../lib/app-context';

export default function SignInPage() {
  const { user, handleSignIn, username, setUsername, password, setPassword } = useContext(AppContext);
  return (
    <div className='container'>
      <SignIn username={username} setUsername={setUsername} password={password} setPassword={setPassword} user={user} handleSignIn={handleSignIn} />
    </div>
  );
}
