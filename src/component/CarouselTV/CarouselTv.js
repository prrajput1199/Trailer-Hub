import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, unavailable } from "../../config/config";
import "./CarouselTV.css"

const handleDragStart = (e) => e.preventDefault();

const CarouselTV = ({id }) => {
  const [credits, setCredits] = useState();

  const fetchCredits = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,image,credits`
    );
    const data = await res.json();
    console.log(data);
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const items = credits?.map((Element) => {
    return (
      <>
        <div className="Carousel">
          <img
            src={
              Element.profile_path
                ? `${img_300}/${Element.profile_path}`
                : unavailable
            }
            alt={Element?.name}
            onDragStart={handleDragStart}
            className="castImg"
          />
          <b className="castName">{Element.name}</b>
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
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default CarouselTV;
