import React from 'react';

export default function MappedImages({ image }) {
  const { imageId, src, prompt } = image;
  return (
    <div className='image wrapper ml-1 mr-1 mb-1'>
      <a href={`#images?imageId=${imageId}`}>
        <img className='list-img' src={'/images/' + src} alt={prompt} />
      </a>
    </div>
  );

}
