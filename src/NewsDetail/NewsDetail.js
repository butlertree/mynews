import React from 'react';
import './NewsDetail.css';

function NewsDetail({ selectedCard, goBackToMain }) {
  const { title, description, urlToImage, url, content, publishedAt, source } = selectedCard;
  const { name } = source;

  return (
    <div className='card-detail'>
      <div className='card-content'>
        <h2 className='title'>{title}</h2>
        <img src={urlToImage} alt='News Image' className='news-image' />
      </div>
      <div className='description'>
        <p>{description}</p>
        <p>Source: {name}</p> {/* Display the source name */}
        <p>Published Date: {publishedAt}</p>
        <a href={url}>Visit News Site</a>
      </div>
      <div>
        <button onClick={goBackToMain}>Back To Main</button>
      </div>
    </div>
  );
}

export default NewsDetail;
