import React, { useContext } from 'react';
import GenerateAgain from '../components/generate-again';
import AppContext from '../lib/app-context';

export default function GeneratedImage() {
  const { src, setSrc, prompt, setPrompt, size, user, currImg, setCurrImg, createdAt, setCreatedAt } = useContext(AppContext);
  return (
    <div className='container'>
      <GenerateAgain src={src} setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} size={size} user={user} currImg={currImg} setCurrImg={setCurrImg} createdAt={createdAt} setCreatedAt={setCreatedAt} />
    </div>
  );
}
