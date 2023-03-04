import React, { useState, useEffect } from 'react';
import Redirect from './redirect';
import MappedImages from './mapped-images';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const userGet = window.localStorage.getItem('user-id');
  // If the userId doesn't exist, use 0
  const { userId } = JSON.parse(userGet) || 0;

  // Fetch the current user's liked images
  useEffect(() => {
    fetch(`/images/mygallery/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data[0].userId) {
          setImages(data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);

  if (!userGet) {
    return <Redirect to='' />;
  }
  if (images.length === 0) {
    return (
      <div className='row center'>
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
