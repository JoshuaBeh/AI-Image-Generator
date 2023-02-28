import React, { useState, useEffect } from 'react';

export default function AllImages({ user, currImage, setCurrImage }) {
  const [images, setImages] = useState();

  function handleClick(imageId) {
    setCurrImage(imageId);
  }

  useEffect(() => {
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };
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
            images && images.slice(0).reverse().map(image => (
              <div key={image.imageId} className='col-25'>
                <Image key={image.imageId} image={image} handleClick={handleClick} />
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
    <a href={`#images?imageId=${imageId}`}>
      <div className=''>
        <img onClick={handleClick(imageId)} src={'/images/' + image.src} alt="" />
      </div>
    </a>
  );
}