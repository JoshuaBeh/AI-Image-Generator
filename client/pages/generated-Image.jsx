import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import GenerateAgain from '../components/generate-again';

export default function GeneratedImage({ src, setSrc }) {
  return (
    <div className='container'>
      <Navbar />
      <GenerateAgain src={src} setSrc={setSrc}/>
      <MobileNavbar />
    </div>
  );
}
