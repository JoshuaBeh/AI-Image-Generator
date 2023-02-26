import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import SignIn from '../components/sign-in';

export default function SignInPage() {
  return (
    <div className='container'>
      <Navbar />
      <SignIn />
      <MobileNavbar />
    </div>
  );
}
