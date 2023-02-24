import React from 'react';

export default function GenerateAgain({ src, setSrc, prompt, setPrompt }) {
  return (
    <>
      <div className='row'>
        <div className='col-full'>
          <div className='generated-image-wrapper'>
            <img src={src}/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-full'>
          <p>{prompt}</p>
          <button className='generate-button'>Generate Again</button>
        </div>
      </div>
    </>
  );
}
