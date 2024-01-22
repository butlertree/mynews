import React from 'react';
import './NewsImage.css';
import {useNavigate} from 'react-router-dom';

function NewsImage({ card }) {
  const { title, urlToImage, description, publishedAt} = card;

const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/news/${card.id}`);
  };

  return (
    <div className='card' onClick={handleCardClick}>
      <img src={urlToImage} alt='News Image' className='news-image' />
      <h3 className='title'>{title}</h3>
      <p className='description'>{description}</p>
      <p className='published-date'>Published Date: {publishedAt}</p>
    </div>
  );
}

export default NewsImage;
