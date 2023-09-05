import React, { useEffect, useState } from "react";
import axios from "axios";
import "./movies.css";
import SingleCardData from "../../component/singleCardData/singleCardData";
import CurrentPage from "../../component/PagesNumber/NumberOfPages";
import Genre from "../../component/genre/genre";
import UseGenre from "../../component/Hooks/useGenre";
import TrailerSection from "../../component/TrailerSection/TrailerSection";
import { Link } from "react-router-dom";
import MoviesCarousel from "./MoviesCarousel";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setselectedGenre] = useState([]);
  const genreforURL = UseGenre(selectedGenre);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}&with_genres=${genreforURL}`
    );
    
    const data = await response.json();
    setMoviesData(data.results);
    setNumberOfPages(500);
    console.log(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, [pageNo, genreforURL]);

  return (
    <>
      <div className="carousel">
        <MoviesCarousel media_type={Element.media_type} id={Element.id} />
      </div>
      <Genre
        type="movie"
        genre={genre}
        setGenre={setGenre}
        selectedGenre={selectedGenre}
        setselectedGenre={setselectedGenre}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
      {/* <span className="pageName">Movies</span> */}
      <div className="movies">
        {moviesData &&
          moviesData.map((element) => {
            return (
              <>
                <Link to={`/Movies/${element.id}`} className="link">
                  <SingleCardData
                    key={element.id}
                    poster={element.poster_path}
                    title={element.original_title || element.original_name}
                    Date={element.release_date || element.first_air_date}
                    media_type={element.media_type}
                    vote_avg={element.vote_average}
                  />
                </Link>
              </>
            );
          })}
      </div>
      {numberOfPages > 1 && (
        <CurrentPage setPageNo={setPageNo} numberOfPages={numberOfPages} />
      )}
    </>
  );
};

export default Movies;
