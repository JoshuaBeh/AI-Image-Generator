import React, { useContext } from 'react';
import Home from '../components/home';
import AppContext from '../lib/app-context';

export default function HomePage() {
  const { setSrc, prompt, setPrompt, size, setSize, user, setCurrImg, setCreatedAt } = useContext(AppContext);
  return (
    <div className='container'>
      <Home setSrc={setSrc} prompt={prompt} setPrompt={setPrompt} size={size} setSize={setSize} user={user} setCurrImg={setCurrImg} setCreatedAt={setCreatedAt} />
    </div>
  );
}
