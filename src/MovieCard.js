import React from "react";
import "./card.css";
import Rating from "./Rating";
import Genre from "./Genre";
function MovieCard({ title, overview, img, generes, release, vote }) {

  let fiveStarRating = vote - 5
  if(fiveStarRating > (parseInt(fiveStarRating) + 0.5))
  {
    fiveStarRating = Math.ceil(fiveStarRating)
  }else if(fiveStarRating < (parseInt(fiveStarRating) + 0.5)){
    fiveStarRating = Math.floor(fiveStarRating)
  }
  
  return (
    <div className="card">
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt="img" />
        <div className="details">
          <h2>{title}</h2>
          <small>{release}</small>
          <div className="rating">
            <Rating rating={fiveStarRating} />

            <small style={{ marginLeft: 5 }}>{vote}</small>
          </div>
          <div className="tags">
            {generes?.map((g) => (
              <Genre genre={g} />
            ))}
          </div>
          <div className="info">
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
