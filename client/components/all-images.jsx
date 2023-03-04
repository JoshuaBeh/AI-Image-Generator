import React, { useState, useEffect } from 'react';
import MappedImages from './mapped-images';

export default function AllImages({ user }) {
  const [images, setImages] = useState([]);

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
          images?.map(image => (
            <div key={image.imageId} className='col-25'>
              <MappedImages key={image.imageId} image={image} />
            </div>
          ))
          }
      </div>
    </>
  );
}
