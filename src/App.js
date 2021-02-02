import "./App.css";
import MovieCard from "./MovieCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Multiselect from "./MultiSelect";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selected, setSelected] = useState([]);
  let newPage = 1;

  const infiniteScroll = () => {
    //DESKTOP BROWSER
    if (
      window.innerHeight + document.documentElement.scrollTop + 0.4 >=
        document.documentElement.offsetHeight ||
      document.documentElement.scrollTop >=
        document.documentElement.height - window.height - 100
    ) {
      newPage = newPage + 1;
      fetchData(newPage, true);
    }
  };
  const fetchData = (num, fromScroll) => {
    console.log("fetching for the ", num);
    console.log(fromScroll);
    const API_KEY = process.env.REACT_APP_API_KEY;
    let url;
    let values = [];
    let selecteMoviesString;

    if (selected.length > 0) {
      selected.map((Element) => (values = [...values, Element.value]));
      selecteMoviesString = values.join(",");
      const selectedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${num}&with_genres=${selecteMoviesString}`;
      url = selectedMovies;
    } else {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${num}`;
    }

    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        if (selected.length > 0) {
          setSelectedMovies((presMovies) => [...presMovies, ...data.results]);
        } else {
          setMovies((presMovies) => [...presMovies, ...data.results]);
        }
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    window.addEventListener("touchmove", infiniteScroll);
    // ON RE-SELECT reset
    newPage = 1;
    setSelectedMovies([]);
    fetchData(1);
  }, [selected]);

  return (
    <div className="App">
      <header>
        <h1>Movie App</h1>
        <Multiselect selected={selected} setSelected={setSelected} />
      </header>
      <div className="movies-wrapper">
        <div className="movies-grid">
          {selected.length > 0
            ? !selectedMovies
              ? "loading"
              : selectedMovies.map((m) => (
                  <MovieCard
                    title={m.title}
                    overview={m.overview}
                    img={m.poster_path}
                    generes={m.genre_ids}
                    release={m.release_date}
                    key={m.id}
                    vote={m.vote_average}
                  />
                ))
            : !movies
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
