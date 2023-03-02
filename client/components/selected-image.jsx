import React, { useState, useEffect } from 'react';

export default function SelectedImage({ imageId }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch(`/images/${imageId}`)
      .then(response => response.json())
      .then(data => setImage(data));
  }, [imageId]);

  const { src, prompt } = image;
  return (
    <div className='row center flex-column mt-2 mr-1 ml-1'>
      <div className='relative'>
        <img className='selected-img' src={`/images/${src}`} alt={prompt} />
        <button className='absolute like-button'>Like <i className="fa-regular fa-heart like-heart" aria-hidden="true" /></button>
        <div>
          <p className='prompt-size white mt-2 mb-05'>Prompt</p>
          <p className='text-center prompt-size grey mb-2'>{prompt}</p>
        </div>
      </div>
    </div>
  );
}
