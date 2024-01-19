import React from 'react';
import './NewsImage.css';

function NewsImage({ card, viewCardDetails }) {
  const { title, urlToImage, description, publishedAt } = card;

  return (
    <div className='card' onClick={viewCardDetails}>
      <img src={urlToImage} alt='News Image' className='news-image' />
      <h3 className='title'>{title}</h3>
      <p className='description'>{description}</p>
      <p className='published-date'>Published Date: {publishedAt}</p>
    </div>
  );
}

export default NewsImage;
