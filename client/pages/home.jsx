import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import UserInput from '../components/userInput';

export default function Home(props) {
  return (
    <div className='container'>
      <Navbar />
      <div className='row'>
        <div className='col-full'>
          <h1>Text to Image with AI Image Generator</h1>
          <h3>Convert words to images in seconds with DALL.E 2</h3>
        </div>
      </div>
      <UserInput />
      <MobileNavbar />
    </div>
  );
}
