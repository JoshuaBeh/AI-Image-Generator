import React, { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import formatCreatedAt from '../lib/format-created-at';

export default function Home({ setSrc, prompt, setPrompt, size, setSize, user, setCurrImg, setCreatedAt }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg('');
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
        setLoading(false);
        if (data.success === false) {
          setErrorMsg(data.message.error.message);
          return;
        }
        setSrc(data.url);

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
            .then(response => response.json())
            .then(data => {
              setCurrImg(data.imageId);
              const date = formatCreatedAt(data.createdAt);
              setCreatedAt(date);
              setLoading(false);
              window.location.hash = 'generate';
            })
            .catch(error => {
              setLoading(false);
              console.error(error);
            });
        }
      });
  }

  function onSelect(event) {
    setSize(event.target.value);
  }

  function handleInput(event) {
    setPrompt(event.target.value);
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
    <>
      <form onSubmit={handleSubmit}>
        <div className='row mt-8 ml-1 mr-1'>
          <div className='col-full'>
            <h1 className='green t-align-center'>Text to Image with AI Image Generator</h1>
            <h3 className='t-align-center white'>Convert words to images in seconds with DALL.E 2</h3>
          </div>
        </div>
        <div className='row mt-2 ml-1-5 mr-1-5'>
          <div className='col-full'>
            <div className='center'>
              <textarea required onChange={handleInput} type="text" className='generate-input' placeholder='Describe What you want to see. Be as descriptive as possible.'/>
            </div>
            <div className='select-row center mt-2'>
              <button className={button} type='sumbit'>Generate</button>
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
              <Select onSelect={onSelect}/>
            </div>
          </div>
        </div>
      </form>
      <div className='red center t-align-center row mr-1 ml-1 mt-2'>
        <h1 className='error-message red'>{errorMsg}</h1>
      </div>
    </>
  );
}

function Select({ onSelect }) {
  return (
    <select name="size" id="size" className='size-button' onChange={onSelect}>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option className='large' value="Large">Large</option>
    </select>
  );
}
