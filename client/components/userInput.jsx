import React, { useState } from 'react';

export default function UserInput() {
  const [generateOptions, setGenerateOptions] = useState({
    prompt: '',
    size: 'Small'
  });

  const [src, setSrc] = useState('');

  function handleClick(event) {
    event.preventDefault();
    const prompt = generateOptions.prompt;
    const size = generateOptions.size;
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

  function handleSelect(event) {
    setGenerateOptions({
      prompt: generateOptions.prompt,
      size: event.target.value
    });
  }

  function handleInput(event) {
    setGenerateOptions({
      prompt: event.target.value,
      size: generateOptions.size
    });
  }
  return (
    <>
      <form onSubmit={handleClick}>
        <div className='row mt-2 ml-1 mr-1'>
          <div className='col-full'>
            <div className='center'>
              <textarea onChange={handleInput} type="text" className='generate-input' placeholder='Describe What you want to see. Be as descriptive as possible.' />
            </div>
            <div className='center space-evenly mt-1'>
              <button className='generate-button' type='sumbit'>Generate</button>
              <Select handleSelect={handleSelect}/>
            </div>
          </div>
        </div>
      </form>
      <img src={src} />
    </>
  );
}

function Select({ handleSelect }) {
  return (
    <select name="size" id="size" className='size-button' onChange={handleSelect}>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
    </select>
  );
}
