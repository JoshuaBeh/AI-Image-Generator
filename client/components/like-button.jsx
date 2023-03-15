import React from 'react';
export default function LikeButton({ handleButtonClick, heartFill, heartColor, isHidden }) {
  return (
    <button
      type='button'
      onClick={handleButtonClick}
      className={`absolute like-button ${isHidden}`}>Like&nbsp;
      <i className={`${heartFill} ${heartColor} fa-heart like-heart`} aria-hidden="true" />
    </button>
  );
}
