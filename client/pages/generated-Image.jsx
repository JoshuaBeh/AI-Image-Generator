import React from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import GenerateAgain from '../components/generate-again';

export default function GeneratedImage({ src, setSrc, prompt, setPrompt, size }) {
  return (
    <div className='container'>
      <Navbar />
      <GenerateAgain src={src} setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} size={size} />
      <MobileNavbar />
    </div>
  );
}
