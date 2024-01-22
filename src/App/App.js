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


  const [generalNews, setGeneralNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  const [scienceNews, setScienceNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const [technologyNews, setTechnologyNews] = useState([]);

  // const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default to general category
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState('false')



  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    navigate(`/category/${newCategory}`); // This should change the URL.
  };


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
        console.log("Fetched Data for", category, ":", data);
        // Ensure that the response contains the articles array
        if (!data.articles) {
          throw new Error('Invalid data format');
        }
        return data.articles.map(article => ({ ...article, id: uuidv4() }));
      });
  };
  

  useEffect(() => {
    setIsLoading(true);
    getCategoryData(selectedCategory)
      .then(data => {
        switch (selectedCategory) {
          case 'sports':
            setSportsNews(data);
            break;
          case 'business':
            setBusinessNews(data);
            break;
          case 'entertainment':
            setEntertainmentNews(data);
            break;
          case 'health':
            setHealthNews(data);
            break;
          case 'technology':
            setTechnologyNews(data);
            break;
          case 'science':
            setScienceNews(data);
            break;
          default:
            setGeneralNews(data);
            console.log("General News: ", data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);


 


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

        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <Routes>
          <Route path="/" element={<News news={generalNews} />} />
          <Route path="/category/general" element={<News news={generalNews} />} />
          <Route path="/category/sports" element={<News news={sportsNews} />} />
          <Route path="/category/business" element={<News news={businessNews} />} />
          <Route path="/category/science" element={<News news={scienceNews} />} />
          <Route path="/category/health" element={<News news={healthNews} />} />
          <Route path="/category/technology" element={<News news={technologyNews} />} />
          <Route path="/category/entertainment" element={<News news={entertainmentNews} />} />
          
          <Route path="/news/:id" element={<NewsDetail news={[...generalNews, ...sportsNews,...businessNews, ...scienceNews, ...healthNews, ...technologyNews, ...entertainmentNews]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
  );


}


export default App;

 
