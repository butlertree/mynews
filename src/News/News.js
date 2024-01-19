import React from 'react';
import './News.css';
import NewsImage from '../NewsImage/NewsImage'

//PASSING THE NEWS ARRA AND THE viewCardDetails function from App.js
function News({news, viewCardDetails}){

//MAP OVER THE news ARRAY AND SET EACH NewsImage card with these key values rendering a new card component for each NewsImage

    return (
        <div className='news-container'>
            {news.map((article) => (
                <NewsImage
                key={article.uuid}
                card={article} //PASSING ARTICLE OBJECT AS PROP TO NewsImage.js
                viewCardDetails={() => viewCardDetails(article)} //PASSING ARTICLE OBJECT AS PROP TO NewsImage.js


                />
            ))}




        </div>

    )

}


export default News;