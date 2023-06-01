import React, { useState } from "react";

const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=4eabb486ad0c1ad9de9e759ef0b032c0&language=en-US&query=';

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}${query}&page=1&include_adult=false`);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name</label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit" disabled={!query.trim()}>
          Search
        </button>
      </form>
      <div className="card-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          movies.filter(movie => movie.poster_path).map(movie => (
            <div className="card" key={movie.id}>
              <img
                className="card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title ? `${movie.title} poster` : 'Movie poster'}
              />
              <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p><small>RELEASE DATE: {movie.release_date}</small></p>
                <p><small>RATING: {movie.vote_average}</small></p>
                <p className="card--desc">{movie.overview}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
