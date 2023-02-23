import React, { useState } from 'react';
// import { generateImage } from '../../server/controllers/openaiController';
export default function UserInput() {
  const [generateOptions, setGenerateOptions] = useState({
    prompt: '',
    size: 'Small'
  });

  // eslint-disable-next-line no-unused-vars
  const [src, setSrc] = useState('');

  function handleInput(event) {
    setGenerateOptions({
      prompt: event.target.value,
      size: generateOptions.size
    });
  }

  function handleClick() {
    // const prompt = generateOptions.prompt;
    // const size = generateOptions.size;
    // setSrc(generateUserImage(prompt, size));
  }

  function handleSelect(event) {
    setGenerateOptions({
      prompt: generateOptions.prompt,
      size: event.target.value
    });
  }

  return (
    <div className='row mt-2 ml-1 mr-1'>
      <div className='col-full'>
        <div className='center'>
          <textarea onChange={handleInput} type="text" className='generate-input' placeholder='Describe What you want to see. Be as descriptive as possible.' />
        </div>
        <div className='center space-evenly mt-1'>
          <a onClick={handleClick} className='generate-button' href="/imageGenerator">Generate</a>
          <Select handleSelect={handleSelect}/>
        </div>
      </div>
      <img src={src} />
    </div>
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

// async function generateUserImage(prompt, size) {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       prompt,
//       size
//     })
//   };
//   try {
//     const response = await fetch('/generateImage', options);
//     const image = await response.json();
//     const src = image.data;
//     console.log(src);
//     return src;
//   } catch (error) {
//     console.log(error);
//   }
// }
