import React, { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

export default function UserInput({ setSrc, prompt, setPrompt, size, setSize, user }) {
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
    const likes = 0;
    const { userId } = user;

    setLoading(true);
    fetch('/openai/generateImage', options)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setSrc(data.url);
        window.location.hash = 'temp';

        const src = data.url;
        const userOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt, src, userId, likes })
        };
        if (user) {
          fetch('/images', userOptions)
            .then(response => {

            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
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
  const classes = switchClasses[loading ? 'isLoading' : 'loaded'];
  return (
    <form onSubmit={handleSubmit}>
      <div className='row mt-2 ml-1 mr-1'>
        <div className='col-full'>
          <div className='center'>
            <textarea required onChange={handleInput} type="text" className='generate-input' placeholder='Describe What you want to see. Be as descriptive as possible.'/>
          </div>
          <div className='select-row center mt-1'>
            <button className={classes.button} type='sumbit'>Generate</button>
            <ThreeCircles
              height="60"
              width="60"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass={classes.spinner}
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
