import './App.css';
import News from '../News/News';
import NewsDetail from '../NewsDetail/NewsDetail';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';


 

function App() {

  const navigate = useNavigate();
  const location = useLocation()

   // Function to add category to heading based on url
   const getCurrentCategory = () => {
    const pathParts = location.pathname.split('/');
    const isDetailPage = pathParts[1] === 'news';
  
    if (isDetailPage) {
      return null; // Indicates that it's a detail page
    } else if (pathParts[1] === 'category') {
      return pathParts[2]; // Returns the category from the URL
    }
    return 'general'; // Default category
  };
  
//Category arrays
  const [generalNews, setGeneralNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [businessNews, setBusinessNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  const [scienceNews, setScienceNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const [technologyNews, setTechnologyNews] = useState([]);

  
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default to general category
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
        return data.articles.map(article => ({ ...article, id: uuidv4() }));
      });
  };

     // Function to check if the category data is empty returns true if not yet loaded helps helper function!!!
const isCategoryEmpty = (category) => {
  switch (category) {
    case 'sports': return sportsNews.length === 0;
    case 'business': return businessNews.length === 0;
    case 'science': return scienceNews.length === 0;
    case 'health': return healthNews.length === 0;
    case 'technology': return technologyNews.length === 0;
    case 'entertainment': return entertainmentNews.length === 0;
    default: return generalNews.length === 0;
  }
};


//selecting a different category
const handleCategoryChange = (e) => {
  const newCategory = e.target.value;
  setSelectedCategory(newCategory);
  navigate(`/category/${newCategory}`);
  
 // Fetch data for the selected category if it's not already loaded envokes getcategoryData when selected
 if (isCategoryEmpty(newCategory)) {
  setIsLoading(true);
  //api call
  getCategoryData(newCategory)
    .then(data => {
      switch (newCategory) {
        case 'sports':
          setSportsNews(data);
          break;
        case 'business':
          setBusinessNews(data);
          break;
        case 'science':
          setScienceNews(data);
          break;
        case 'health':
          setHealthNews(data);
          break;
        case 'entertainment':
          setEntertainmentNews(data);
          break;
        case 'technology':
          setTechnologyNews(data);
          break;
      }
    })
    .catch(error => {
      console.error("Error fetching news:", error);
      setError(error.message);
    })
    .finally(() => setIsLoading(false));
}
};


//Envodes getCategoryData on mount  
useEffect(() => {
  setIsLoading(true);
  getCategoryData('general')
    .then(data => {
      setGeneralNews(data);
    })
    .catch(error => {
      console.error("Error fetching news:", error);
      setError(error.message);
    })
    .finally(() => setIsLoading(false));
}, []); // Empty dependency array to ensure it runs only on initial render

  



  return (
      <main className="App">
        <header>
          <h1>BNN</h1>
          {getCurrentCategory() && (
          <h2>{getCurrentCategory().charAt(0).toUpperCase() + getCurrentCategory().slice(1)} News</h2>)}
          <nav className="buttons-container">
          <Link to="/">Main Page</Link> 
          </nav>
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
        {error && <h2>Something went wrong, please try again later!</h2>}

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

 
