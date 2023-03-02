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
          const { userId } = user;
          const src = data.url;
          const userOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, src, userId })
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
          <div className='relative'>
            <img className='selected-img' src={'/images/' + src}/>
            <button className='absolute like-button'>Like <i className="fa-regular fa-heart like-heart" aria-hidden="true" /></button>
            <div>
              <p className='prompt-size white mt-2 mb-05'>Prompt</p>
              <p className='text-center prompt-size grey mb-2'>{prompt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-full center flex-column'>
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
