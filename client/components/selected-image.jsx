import React, { useState, useEffect } from 'react';

export default function SelectedImage({ imageId, user }) {
  const [image, setImage] = useState('');
  const [isLiked, setIsLiked] = useState(false);

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
        for (let i = 0; i < data.length; i++) {
          const currUser = data[i].userId;
          const currImg = data[i].imageId;
          if (user && currUser === String(user.userId) && currImg === imageId) {
            setIsLiked(true);
            return;
          } else {
            setIsLiked(false);
          }
        }
      })
      .catch(error => console.error(error));
  }, [imageId, user, isLiked]);

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
      .catch(error => {
        console.error(error);
      });
    if (isLiked === false) {
      setIsLiked(true);
    }
  }

  const switchClasses = {
    liked: {
      heartColor: 'red',
      heartFill: 'fa-solid'
    },
    unliked: {
      heartColor: 'white',
      heartFill: 'fa-solid'
    }
  };
  const { heartColor, heartFill } = switchClasses[isLiked ? 'liked' : 'unliked'];
  const { src, prompt } = image;
  return (
    <div className='row center flex-column mt-2 mr-1 ml-1'>
      <div className='relative'>
        <img className='selected-img' src={`/images/${src}`} alt={prompt} />
        <button
        onClick={handleButtonClick}
        className='absolute like-button'>Like
          <i className={`${heartFill} ${heartColor} fa-heart like-heart`} aria-hidden="true" />
        </button>
        <div>
          <p className='prompt-size white mt-2 mb-05'>Prompt</p>
          <p className='text-center prompt-size grey mb-2'>{prompt}</p>
        </div>
      </div>
    </div>
  );
}
