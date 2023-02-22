import React from 'react';

export default function UserInput() {
  return (
    <div className='row mt-2 ml-1 mr-1'>
      <div className='col-full'>
        <textarea type="text" className='generate-input' placeholder='Describe What you want to see. Try to be as descriptive as possible for the best results.' />
        <div className='center space-evenly'>
          <button className='generate-button'>Generate</button>
          <button>Small</button>
        </div>
      </div>
    </div>
  );
}
