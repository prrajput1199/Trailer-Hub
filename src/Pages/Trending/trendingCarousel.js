import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, unavailable } from "../../config/config";
import "./trendingCarousel.css"

const handleDragStart = (e) => e.preventDefault();

const TrendingCarousel = () => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [content, setContent] = useState();


  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setContent(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const items = content?.map((Element) => {
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
      items={items}
      autoPlay
      autoPlayInterval={2000}
      animationDuration={700}
      fullwidth
    />
  );
};

export default TrendingCarousel;
