import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';

export default function Home(props) {
  return (
    <div className='container'>
      <Navbar />
      <MobileNavbar />
    </div>
  );
}
