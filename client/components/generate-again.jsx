import React, { useState, useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import likeButton from '../lib/like-button';
import LikeButton from './like-button';

export default function GenerateAgain({ src, setSrc, prompt, setPrompt, size, user, currImg, setCurrImg }) {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch a list of all liked images and check to see if the
  // selected image is liked by the current user
  useEffect(() => {
    fetch(`/images/${currImg}/likedImage`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const currUser = data[i].userId;
          if (user && currUser === String(user.userId) && data[i].imageId === currImg) {
            setIsLiked(true);
            return;
          } else {
            setIsLiked(false);
          }
        }
      })
      .catch(error => console.error(error));
  }, [currImg, user]);

  function handleButtonClick() {
    const { userId } = user;
    likeButton(isLiked, currImg, userId, setIsLiked);
  }

  // Creates an AI image and if the user is logged in, post to database
  function handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        size
      })
    };
    setLoading(true);
    fetch('/openai/generateImage', options)
      .then(response => response.json())
      .then(data => {
        setSrc(data.url);
        setLoading(false);

        if (user) {
          const { userId } = user;
          const src = data.url;
          const userOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, src, userId })
          };
          fetch('/images', userOptions)
            .then(response => response.json())
            .then(data => setCurrImg(data.imageId))
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const likeImage = {
    liked: {
      heartColor: 'red',
      heartFill: 'fa-solid'
    },
    unliked: {
      heartColor: 'white',
      heartFill: 'fa-regular'
    }
  };
  const loadingButton = {
    isLoading: {
      button: 'hidden',
      spinner: 'spinner'
    },
    loaded: {
      button: 'generate-button',
      spinner: 'hidden'
    }
  };
  const { heartColor, heartFill } = likeImage[isLiked ? 'liked' : 'unliked'];
  const { button, spinner } = loadingButton[loading ? 'isLoading' : 'loaded'];
  return (
    <form onSubmit={handleSubmit}>
      <div className='row mt-2 mr-1 ml-1'>
        <div className='col-full center'>
          <div className='relative'>
            <img className='selected-img' src={'/images/' + src}/>
            <LikeButton handleButtonClick={handleButtonClick} heartFill={heartFill} heartColor={heartColor} />
            <div>
              <p className='prompt-size white mt-2 mb-05'>Prompt</p>
              <p className='text-center prompt-size grey mb-2'>{prompt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-full center flex-column'>
          <ThreeCircles
            height="60"
            width="60"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass={spinner}
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
          <button type='submit' className={`${button} mb-2`}>Generate Again</button>
        </div>
      </div>
    </form>
  );
}
