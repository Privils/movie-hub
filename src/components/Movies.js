import React, { useEffect, useState } from "react";

const Movies = () => {
    const image_url = "https://image.tmdb.org/t/p/w500/";
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [originalMovies, setOriginalMovies] = useState([]);
  
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [displayedMovies, setDisplayedMovies] = useState(12);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${currentPage}`; // Use currentPage variable
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${API_KEY}`;
    
    const listTypes = ['popular', 'top_rated', 'now_playing', 'upcoming'];
    const BASE_URL = 'https://api.themoviedb.org/3/movie';
    useEffect(() => {
      fetchMovies();
      fetchGenres();
    }, []);
  
    const fetchMovies = async () => {
      try {
        const requests = listTypes.map(async (listType) => {
          const apiUrl = `${BASE_URL}/${listType}?language=en-US&page=1&api_key=${API_KEY}`;
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          return data.results;
        });
        const moviesData = await Promise.all(requests);
        const updatedMovies = moviesData.flat(); // Flatten the array of movie lists
        setOriginalMovies(updatedMovies); // Update originalMovies state
        setMovies(updatedMovies); // Update movies state
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    
  
    const fetchGenres = async () => {
      try {
        const response = await fetch(genresUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genre data:", error);
        setError("Failed to fetch data");
      }
    };
  
    //selected genre data
    function filterByGenre(selectedGenreId) {
      if (selectedGenreId === null) {
        setDisplayedMovies(10);
        setMovies(originalMovies);
      } else {
        const filteredMovies = originalMovies.filter(movie => movie.genre_ids.includes(selectedGenreId));
        setMovies(filteredMovies);
      }
    }
  
    const loadMore = () => {
      setCurrentPage(currentPage + 1); // Increment currentPage
      setDisplayedMovies(displayedMovies + 12);
    };
  
    function getColor(vote) {
      if (vote >= 8) {
        return "green";
      } else if (vote >= 5) {
        return "orange";
      } else {
        return "red";
      }
    }
  return (
<>
<section className="container_section">
        <h1 className="movies_title">Movies</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="error">{error} please refresh page!!</p>}
            <div className="item_container">
              <div className="genres">
                <h1>Genres</h1>
                <div className="genre_container">
                  {genres.map((genreValue, index) => (
                    <button key={index} id="genreBtn" onClick={() => filterByGenre(genreValue.id)}>
                      {genreValue.name}
                    </button>
                  ))}
                  <button className="btn" id="genreBtn" onClick={() => filterByGenre(null)}>All</button>
                </div>
              </div>
              <div className="resultscontainer">
                {movies.length === 0 && (
                  <p>No movies available for the selected genre.</p>
                )}
                {movies.slice(0, displayedMovies).map((movie, index) => (
                  <div className="forOverview" key={index}>
                    <div className="movies">
                      <img
                        src={`${image_url}${movie.poster_path}`}
                        alt=""
                        className="movie_img"
                      />
                      <div className="movieInfo">
                        <div className={`ratingCircle ${getColor(movie.vote_average)}`}>
                          <h4 className="rating">{movie.vote_average}</h4>
                        </div>
                        <h2 className="movie_name">{movie.title}</h2>
                        <p className="releaseDate">{movie.release_date}</p>
                      </div>
                    </div>
                    <p className="overview">{movie.overview}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="loadmore">
              {displayedMovies < movies.length && (
                <button className="load_more_btn" onClick={loadMore}>
                  Load More
                </button>
              )}
            </div>
          </>
        )}
      </section>
</>
  )
}

export default Movies
