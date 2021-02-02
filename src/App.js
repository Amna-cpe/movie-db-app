import "./App.css";
import MovieCard from "./MovieCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  let newPage = 1;

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 0.4 >
      document.documentElement.offsetHeight
    ) {
      newPage = newPage + 1;
      fetchData(newPage);
    }
  };
  const fetchData = async (num) => {
    console.log("fetching for the ", num);
    const API_KEY =
      process.env.REACT_APP_API_KEY 
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${num}`;
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) =>
        setMovies((presMovies) => [...presMovies, ...data.results])
      );
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    //the first time
    fetchData(1);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
      </header>
      <div className="movies-wrapper">
        <div className="movies-grid">
          {!movies
            ? "loading"
            : movies.map((m) => (
                <MovieCard
                  title={m.title}
                  overview={m.overview}
                  img={m.poster_path}
                  generes={m.genre_ids}
                  release={m.release_date}
                  key={m.id}
                  vote={m.vote_average}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
