import React from 'react';

export default function GenerateAgain({ src, setSrc, prompt, setPrompt, size }) {

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
    fetch('/openai/generateImage', options)
      .then(response => response.json())
      .then(data => {
        setSrc(data.url);
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
          <button type='submit' className='generate-button'>Generate Again</button>
        </div>
      </div>
    </form>
  );
}
