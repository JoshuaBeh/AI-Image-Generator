import React, { useState, useEffect } from 'react';

export default function AllImages({ user }) {
  const [images, setImages] = useState();

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
      <div className='row'>

        {
            images && images.map(image => (
              <div key={image.imageId} className=''>
                <Image image={image}/>
              </div>
            ))
          }

      </div>
    </>
  );
}

function Image({ image }) {
  return (
    <div className='col-25'>
      <img src={image.src} alt="" />
    </div>
  );
}
