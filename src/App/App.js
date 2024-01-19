import './App.css';
import News from '../News/News';
import NewsDetail from '../NewsDetail/NewsDetail';
import { useState, useEffect } from 'react';
import sportsData from '../data/sports'; 
import businessData from '../data/business'; 
import entertainmentData from '../data/entertain'; 
import generalData from '../data/general'; 
import healthData from '../data/health'; 
import scienceData from '../data/science'; 
import technologyData from '../data/technology'; 

function App() {
  const [news, setNews] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default to general category

  useEffect(() => {
    // Load data based on selected category
    const selectedData = getCategoryData(selectedCategory);
    setNews(selectedData);
  }, [selectedCategory]);

  const getCategoryData = (category) => {
    switch (category) {
      case 'sports':
        return sportsData.articles; // Use the imported sports data
      // Add cases for other categories with import and return statements for mock data.
      case 'business':
        return businessData.articles; // Import business data here
      case 'entertainment':
        return entertainmentData.articles; // Import entertainment data here
        case 'health':
        return healthData.articles; // Import entertainment data here
        case 'science':
        return scienceData.articles; // Import entertainment data here
        case 'technology':
        return technologyData.articles; // Import entertainment data here
      // ...
      default:
        return generalData.articles; // Default to general category
    }
  };

  //FUNCTION THAT TAKES THE CARD SELECTED AND PASSES TO setSelectedCard TO CHANGE STATE
  function viewCardDetails(card) {
    setSelectedCard(card);
  }

  //FUNCTION TO CHANGE THE STATE OF THE SELECTED CARD TO GET BACK TO MAIN
  function goBackToMain() {
    setSelectedCard(null);
  }

  return (
    <main className="App">
      <h1 className='bigHeading'>BotNews</h1>
      {/* Conditionally render the category selector */}
      {selectedCard === null && (
        <div className="category-selector">
          <label>Select Category:</label>
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="general">General</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      )}
      {selectedCard ? (
        <NewsDetail selectedCard={selectedCard} goBackToMain={goBackToMain}/>
      ) : (
        <News news={news} viewCardDetails={viewCardDetails}/>
      )}
      {error && <h2>Something went wrong, please try again later!</h2>}
    </main>
  );
}


export default App;
