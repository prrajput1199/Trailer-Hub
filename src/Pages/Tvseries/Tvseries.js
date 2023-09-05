import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleCardData from "../../component/singleCardData/singleCardData";
import CurrentPage from "../../component/PagesNumber/NumberOfPages";
import Genre from "../../component/genre/genre";
import UseGenre from "../../component/Hooks/useGenre";
import "./tv.css";
import { Link } from "react-router-dom";
import TvseriesCarousel from "./tvseriesCarousel";

const Tvseries = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setselectedGenre] = useState([]);
  const genreforURL = UseGenre(selectedGenre);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      // `https://api.themoviedb.org/3/discover/tv?api_key=1963d424aa84ec781e1bb725fd81a30e&page=${pageNo}&with_genres=${genreforURL}`
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}&with_genres=${genreforURL}`
    );

    setMoviesData(data.results);
    setNumberOfPages(500);
  };

  useEffect(() => {
    fetchMovies();
  }, [pageNo, genreforURL]);

  return (
    <>
      <div className="carousel">
        <TvseriesCarousel/>
      </div>
      <Genre
        type="tv"
        genre={genre}
        setGenre={setGenre}
        selectedGenre={selectedGenre}
        setselectedGenre={setselectedGenre}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
      {/* <span className="pageName">Tvseries</span> */}
      <div className="tv">
        {moviesData &&
          moviesData.map((element) => {
            return (
              <>
                <Link to={`/tvseries/${element.id}`} className="link">
                  <SingleCardData
                    key={element.id}
                    poster={element.poster_path}
                    title={element.original_title || element.original_name}
                    Date={element.release_date || element.first_air_date}
                    media_type="tv"
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

export default Tvseries;
