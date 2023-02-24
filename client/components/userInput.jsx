import React from 'react';

export default function UserInput({ setSrc, prompt, setPrompt, size, setSize }) {

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
        window.location.hash = 'temp';
      })
      .catch(error => {
        console.error(error);
      });
  }

  function onSelect(event) {
    setSize(event.target.value);
  }

  function handleInput(event) {
    setPrompt(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='row mt-2 ml-1 mr-1'>
        <div className='col-full'>
          <div className='center'>
            <textarea onChange={handleInput} type="text" className='generate-input' placeholder='Describe What you want to see. Be as descriptive as possible.' />
          </div>
          <div className='select-row center mt-1'>
            <button className='generate-button' type='sumbit'>Generate</button>
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
