import React, { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

export default function GenerateAgain({ src, setSrc, prompt, setPrompt, size, user }) {
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

        if (user) {
          const likes = 0;
          const { userId } = user;
          const src = data.url;
          const userOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, src, userId, likes })
          };
          fetch('/images', userOptions)
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const switchClasses = {
    isLoading: {
      button: 'hidden',
      spinner: 'spinner'
    },
    loaded: {
      button: 'generate-button',
      spinner: 'hidden'
    }
  };
  const { button, spinner } = switchClasses[loading ? 'isLoading' : 'loaded'];

  return (
    <form onSubmit={handleSubmit}>
      <div className='row mt-2 mr-1 ml-1'>
        <div className='col-full center'>
          <div className='generated-image-wrapper'>
            <img src={'/images/' + src}/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-full center flex-column'>
          <p className='grey mb-2 mt-1'><span className='white'>Prompt:</span> {prompt}</p>
          <ThreeCircles
            height="60"
            width="60"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass={spinner}
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
          <button type='submit' className={`${button} mb-2`}>Generate Again</button>
        </div>
      </div>
    </form>
  );
}
