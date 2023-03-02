import React, { useState, useEffect } from 'react';

export default function AllImages({ user }) {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch('/images')
      .then(response => response.json())
      .then(data => {
        setImages(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div className='row center'>
        <h1 className='green'>All Images</h1>
      </div>
      <div className='row flex-wrap'>

        {
          // If images exists, render each image in reverse order
          images?.slice(0).reverse().map(image => (
            <div key={image.imageId} className='col-25'>
              <Image key={image.imageId} image={image} />
            </div>
          ))
          }

      </div>
    </>
  );
}

function Image({ image, handleClick }) {
  const { imageId } = image;
  return (
    <div className='image wrapper ml-1 mr-1 mb-1'>
      <a href={`#images?imageId=${imageId}`}>
        <img className='list-img' src={'/images/' + image.src} alt={image.prompt} />
      </a>
    </div>

  );
}
