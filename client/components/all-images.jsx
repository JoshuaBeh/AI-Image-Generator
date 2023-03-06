import React, { useState, useEffect } from 'react';
import MappedImages from './mapped-images';
import IsLoadingSpinner from './is-loading-spinner';

export default function AllImages({ user }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/images')
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <IsLoadingSpinner />
    );
  }
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
