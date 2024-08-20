import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [shows, setShows] = useState([]); // Use an array to store multiple shows
  const [error, setError] = useState(null);

  const fetchTvShows = async () => {
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${inputValue}`,
        { headers: { accept: 'application/json' } }
      );

      if (response.data.length > 0) {
        setShows(response.data); // Store all results in the state
        setError(null);
      } else {
        setShows([]);
        setError('No shows found.');
      }
    } catch (err) {
      console.error('There was an Error: ', err);
      setShows([]);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTvShows();
  };

  return (
    <div>
      <h2>Find your TV Shows here!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="show-results">
        {shows.map((item, index) => (
          item.show.image && (
            <div key={index} className="show-item">
              <img src={item.show.image.medium} alt={item.show.name} />
              <p>{item.show.name}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default App;

