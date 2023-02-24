import React, { useState } from 'react';

export default function GenerateAgain({ src, setSrc, prompt, setPrompt, size }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        size
      })
    };
    setLoading(true);
    fetch('/openai/generateImage', options)
      .then(response => response.json())
      .then(data => {
        setSrc(data.url);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='row mt-2 mr-1 ml-1'>
        <div className='col-full center'>
          <div className='generated-image-wrapper'>
            <img src={src}/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-full center flex-column'>
          <p className='grey mb-2 mt-1'><span className='white'>Prompt:</span> {prompt}</p>
          <button type='submit' className='generate-button mb-2'>Generate Again</button>
        </div>
      </div>
    </form>
  );
}
