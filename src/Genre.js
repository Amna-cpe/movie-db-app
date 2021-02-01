import React, { useState ,useEffect } from "react";

function Genre({genre}) {
  const [name, setName] = useState("");
 

  function mapTogenreString(genre)  {
    if (genre === 28) setName("Action");
    if (genre === 12) setName("Adventure");
    if (genre === 16) setName("Animation");
    if (genre === 35) setName("Comedy");
    if (genre === 80) setName("Crime");
    if (genre === 99) setName("Documentary");
    if (genre === 18) setName("Drama");
    if (genre === 10751) setName("Family");
    if (genre === 14) setName("Fantasy");
    if (genre === 36) setName("History");
    if (genre === 27) setName("Horror");
    if (genre === 10402) setName("Music");
    if (genre === 9648) setName("Mystery");
    if (genre === 10749) setName("Romance");
    if (genre === 878) setName("Science Fiction");
    if (genre === 10770) setName("TV Movie");
    if (genre === 53) setName("Thriller");
    if (genre === 10752) setName("War");
    if (genre === 37) setName("Western");
  }
  useEffect(() => {
    mapTogenreString(genre)
  }, [])

  return <span className={`default ${name}`}>{name?name:"shen"}</span>;
}

export default Genre;
