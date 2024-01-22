import './App.css';
import News from '../News/News';
import NewsDetail from '../NewsDetail/NewsDetail';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NotFound from '../NotFound/NotFound';
import sportsData from '../data/sports'; 
import businessData from '../data/business'; 
import entertainmentData from '../data/entertain'; 
import generalData from '../data/general'; 
import healthData from '../data/health'; 
import scienceData from '../data/science'; 
import technologyData from '../data/technology'; 

 

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default to general category
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState('false')


  const getCategoryData = (category) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=f1f66cfc65f944e7b26801f4632f16f3`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Ensure that the response contains the articles array
        if (!data.articles) {
          throw new Error('Invalid data format');
        }
        return data.articles;
      });
  };
  

  useEffect(() => {
    setIsLoading(true);
    getCategoryData(selectedCategory)
      .then(articles => {
        const newsWithIds = articles.map(article => ({
          ...article,
          id: uuidv4(),
        }));
        setNews(newsWithIds);
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategory]);
  

 

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/category/${newCategory}`); // Navigate to the category URL
  };


  return (
      <main className="App">
        <header>
          <h1>Your News</h1>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="general">General</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </header>

        <Routes>
          <Route path="/" element={<News news={news} />} />
          <Route path="/category/:categoryName" element={<News news={news} />} />
          <Route path="/news/:id" element={<NewsDetail news={news} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
  );


}


export default App;

 
