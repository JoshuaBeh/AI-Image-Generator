import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import MobileNavbar from '../components/mobileNavbar';
import GenerateAgain from '../components/generate-again';
import AppContext from '../lib/app-context';

export default function GeneratedImage() {
  const { src, setSrc, prompt, setPrompt, size, user, currImg, setCurrImg } = useContext(AppContext);
  return (
    <div className='container'>
      <Navbar />
      <GenerateAgain src={src} setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} size={size} user={user} currImg={currImg} setCurrImg={setCurrImg} />
      <MobileNavbar />
    </div>
  );
}
