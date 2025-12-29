// React //
import React from "react";
import { useState, useEffect } from "react";

// CSS //
import "./index.css";

// Components //
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

// API //
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// API Options //
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const App = () => {
  // States //
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  // Endpoints //
  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies !");
      }
      const data = await response.json();
      if (data.Reesponse === "false") {
        setError(data.Error || "Failed to fetch movies !");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setError("Error fetching movies.Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect //
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className=" mt-[20px]">All Movies </h2>
          {isloading ? (
            <Spinner />
          ) : error ? (
            <p className=" text-red-500">{error}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
