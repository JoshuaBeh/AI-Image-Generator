import React from 'react';

export default function GenerateAgain({ src, setSrc }) {
  return (
    <div>
      <div className='generated-image-wrapper'>
        <img src={src}/>
      </div>
      <p>Prompt:</p>
      <button className='generate-button'>Generate Again</button>
    </div>
  );
}
