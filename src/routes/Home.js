import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    // proxy for the temporary api (2020.03.14 - 'https://yts.mx/api/v2/list_movies.json')
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    setLoading(false);
    setMovies(movies);
  };

  const loader_default = () => {
    return (
      <div className="loader">
        <span className="loader_text">Loading...</span>
      </div>
    );
  };

  const loader_movies = () => {
    return (
      <div className="movies">
        {movies.map(m => {
          return (
            <Movie
              key={m.id}
              id={m.id}
              year={m.year}
              title={m.title}
              summary={m.summary}
              poster={m.medium_cover_image}
              genres={m.genres}
            />
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <section className="container">
      {isLoading ? loader_default() : loader_movies()}
    </section>
  );
};

export default Home;
