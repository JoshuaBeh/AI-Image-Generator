/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

export default function SelectedImage({ imageId, user }) {
  const [image, setImage] = useState('');
  const [isLiked, setIsLiked] = useState();

  // Fetch the selected image's row from the database
  useEffect(() => {
    fetch(`/images/${imageId}`)
      .then(response => response.json())
      .then(data => setImage(data))
      .catch(error => console.error(error));
  }, [imageId]);

  // Fetch a list of all liked images and check to see if the
  // selected image is liked by the current user
  useEffect(() => {
    fetch(`/images/${imageId}/likedImage`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }, [imageId]);

  // Adds the current user's userId and the selected imageId to the database
  function handleButtonClick() {
    const { userId } = user;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageId,
        userId
      })
    };

    fetch('/images/likedImage', options)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  const { src, prompt } = image;
  return (
    <div className='row center flex-column mt-2 mr-1 ml-1'>
      <div className='relative'>
        <img className='selected-img' src={`/images/${src}`} alt={prompt} />
        <button
        onClick={handleButtonClick}
        className='absolute like-button'>Like
          <i className="fa-regular fa-heart like-heart" aria-hidden="true" />
        </button>
        <div>
          <p className='prompt-size white mt-2 mb-05'>Prompt</p>
          <p className='text-center prompt-size grey mb-2'>{prompt}</p>
        </div>
      </div>
    </div>
  );
}
