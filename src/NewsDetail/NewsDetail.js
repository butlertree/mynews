import React from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css';

function NewsDetail({ news }) {
  const { id } = useParams();
  const article = news.find(article => article.id === id);

  if (!article) {
    // If article not found in the news array, show a not found message

    return (
    <div className="news-not-found">
        <h2>News article not found!</h2>
    </div>
    )
  }

  const { title, urlToImage, url, content, publishedAt, source } = article;
  const { name } = source;

  return (
    <div className='card-detail'>
      <div className='card-content'>
        <h2 className='title'>{title}</h2>
        <img src={urlToImage} alt='News Image' className='news-image' />
      </div>
      <div className='description'>
        <p>{content}</p>
        <p>Source: {name}</p> 
        <p>Published Date: {publishedAt}</p>
        <a href={url}>Visit News Site</a>
      </div>
    </div>
  );
}

export default NewsDetail;











