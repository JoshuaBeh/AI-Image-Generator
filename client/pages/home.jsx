import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import UserInput from '../components/userInput';

export default function Home({ setSrc, prompt, setPrompt }) {
  return (
    <div className='container'>
      <Navbar />
      <div className='row mt-2 ml-1 mr-1'>
        <div className='col-full'>
          <h1 className='green t-align-center'>Text to Image with AI Image Generator</h1>
          <h3 className='t-align-center'>Convert words to images in seconds with DALL.E 2</h3>
        </div>
      </div>
      <UserInput setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} />
      <MobileNavbar />
    </div>
  );
}
