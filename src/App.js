import "./App.css";
import MovieCard from "./MovieCard";
import React, { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPages] = useState(1);

  const infiniteScroll =  ()=>{
    // End of the document reached?
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      let newPage = page;
      newPage=newPage+1;      
      setPages(page+1);
      fetchData(newPage);
    }
  };
  const fetchData =  async(num) => {
    
    const API_KEY = process.env.API_KEY
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${num}`
    await fetch(url)
      .then((res) => res.json())
      .then((data) =>setMovies(presMovies=>[...presMovies,...data.results]))
     
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll)
    fetchData(page)

  }, []);

 console.log("the page ",movies)
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
