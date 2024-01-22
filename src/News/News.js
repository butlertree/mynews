import React from 'react';
import './News.css';
import NewsImage from '../NewsImage/NewsImage'

//PASSING THE NEWS ARRA AND THE viewCardDetails function from App.js
function News({news}){

    // let { categoryName } = useParams();
    // Use categoryName to determine what news to display
    console.log("News in News Component: ", news);


//check if a news article has the data I need  not null and not removed

function isValidArticle(article){

    return (
        
            article.title !== null && article.title !== '[Removed]' &&
            article.description !== null && article.description !== '[Removed]' &&
            article.urlToImage !== null && article.urlToImage !== '[Removed]' &&
            article.publishedAt !== null && article.publishedAt !== '[Removed]' &&
            article.content !== null && article.content !== '[Removed]' &&
            article.source.name !== null && article.source.name !== '[Removed]'
        );

}


 // Filter the news array to include only valid articles
 const validNews = news.filter(isValidArticle);


    //MAP OVER THE (validNews) ARRAY AND SET EACH NewsImage card with these key values rendering a new card component for each NewsImage


    return (
        <div className='news-container'>
        {validNews.map((article) => (
            <NewsImage
            key={article.id}
            id={article.id}
            card={article} //PASSING ARTICLE OBJECT AS PROP TO NewsImage.j
            />
            ))}
        </div>
      );
    }


export default News;

