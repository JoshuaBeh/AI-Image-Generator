import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import SignUp from '../components/sign-up';
import AppContext from '../lib/app-context';

export default function SignUpPage({ username, setUsername, password, setPassword }) {
  const { user, handleSignIn } = useContext(AppContext);

  return (
    <div className='container'>
      <Navbar />
      <SignUp username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleSignIn={handleSignIn} user={user}/>
      <MobileNavbar />
    </div>
  );
}
