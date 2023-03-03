export default function likeButton(isLiked, imageId, userId, setIsLiked) {
  if (!isLiked) {
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
    setIsLiked(true);
  } else {
    const options = {
      method: 'DELETE',
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
    setIsLiked(false);
  }
}
