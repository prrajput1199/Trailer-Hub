import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, unavailable } from "../../config/config";

const handleDragStart = (e) => e.preventDefault();

const TvseriesCarousel = () => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [Content, setContent] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setContent(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Items = Content?.map((Element) => {
    return (
      <>
        <div className="trendingCarousel">
          <img
            src={
              Element.backdrop_path
                ? `${imagePath}/${Element.backdrop_path}`
                : unavailable
            }
            alt={Element?.name}
            onDragStart={handleDragStart}
            className="castImg"
          />
        </div>
      </>
    );
  });

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      items={Items}
      autoPlay
      autoPlayInterval={2000}
      animationDuration={700}
    />
  );
};

export default TvseriesCarousel;
