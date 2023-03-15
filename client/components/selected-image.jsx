import React, { useState, useEffect } from 'react';
import likeButton from '../lib/like-button';
import LikeButton from './like-button';
import formatCreatedAt from '../lib/format-created-at';
import IsLoadingSpinner from './is-loading-spinner';

export default function SelectedImage({ imageId, user }) {
  const [image, setImage] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the selected image's row from the database
  useEffect(() => {

    setIsLoading(true);
    fetch(`/api/images/${imageId}`)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        data.createdAt = formatCreatedAt(data.createdAt);
        setImage(data);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
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
  }, [imageId, user]);

  // Adds the current user's userId and the selected imageId to the database
  function handleButtonClick() {
    const { userId } = user;
    likeButton(isLiked, imageId, userId, setIsLiked);
  }

  const switchClasses = {
    liked: {
      heartColor: 'red',
      heartFill: 'fa-solid'
    },
    unliked: {
      heartColor: 'white',
      heartFill: 'fa-regular'
    }
  };

  if (isLoading || !image) {
    return (
      <IsLoadingSpinner />
    );
  }
  const isHidden = user ? '' : 'hidden';
  const { heartColor, heartFill } = switchClasses[isLiked ? 'liked' : 'unliked'];
  const { src, prompt, createdAt, username } = image;
  return (
    <div className='row center flex-column mt-2 mr-1 ml-1'>
      <div className='relative'>
        <img className='selected-img' src={src} alt={prompt} />
        <LikeButton handleButtonClick={handleButtonClick} heartFill={heartFill} heartColor={heartColor} isHidden={isHidden} />
        <div>
          <p className='prompt-size white mt-2 mb-05'>Prompt</p>
          <p className='text-center prompt-size grey'>{prompt}</p>
          <p className='prompt-size white mt-1 mb-05'>Created By</p>
          <p className='text-center prompt-size grey'>{username}</p>
          <p className='prompt-size white mt-1 mb-05'>Created At</p>
          <p className='text-center prompt-size grey mb-2'>{createdAt}</p>
        </div>
      </div>
    </div>
  );
}
