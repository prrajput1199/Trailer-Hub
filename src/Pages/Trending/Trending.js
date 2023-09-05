import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import SingleCardData from "../../component/singleCardData/singleCardData";
import CurrentPage from "../../component/PagesNumber/NumberOfPages";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import TrendingCarousel from "./trendingCarousel";


const Trending = () => {
  const apiKey  = process.env.REACT_APP_API_KEY;
  const [TrendingData, setTrendingData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const imagePath = "https://image.tmdb.org/t/p/original";



  const fetchTrendingData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}`
    );
    setTrendingData(data.results);
  };


  useEffect(() => {
    fetchTrendingData();
  }, [pageNo]);

  return (
    <>
      <div className="trendingCarousel">
        <TrendingCarousel />
      </div>

      {/* <span className="pageName">Trending</span> */}
      <div className="trending">
        {TrendingData &&
          TrendingData.map((element) => {
            return (
              <>
                <Link
                  to={`/Trending/${element.media_type}/${element.id}`}
                  className="link"
                >
                  <SingleCardData
                    data-aos="flip-left"
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
      <CurrentPage setPageNo={setPageNo} />
    </>
  );
};

export default Trending;
