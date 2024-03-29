import React, { useState, useEffect } from 'react';
import Redirect from './redirect';
import MappedImages from './mapped-images';
import IsLoadingSpinner from './is-loading-spinner';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userGet = window.localStorage.getItem('user-id');
  // If the userId doesn't exist, use 0
  const { userId } = JSON.parse(userGet) || 0;

  // Fetch the current user's liked images
  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`/images/mygallery/${userId}`)
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if (data[0].userId) {
            setImages(data);
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.error(error);
        });
    }
  }, [userId]);

  if (!userGet) {
    return <Redirect to='#sign-in' />;
  }

  if (isLoading) {
    return (
      <IsLoadingSpinner />
    );
  }

  if (images.length === 0) {
    return (
      <div className='row t-align-center mr-1 ml-1 center'>
        <h1 className='green'>Your generated images will be here.</h1>
      </div>
    );
  }

  return (
    <>
      <div className='row center'>
        <h1 className='green'>My Gallery</h1>
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
