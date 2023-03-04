import React, { useContext } from 'react';
import SignUp from '../components/sign-up';
import AppContext from '../lib/app-context';

export default function SignUpPage() {
  const { user, handleSignIn, username, setUsername, password, setPassword } = useContext(AppContext);
  return (
    <div className='container'>
      <SignUp username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleSignIn={handleSignIn} user={user}/>
    </div>
  );
}
