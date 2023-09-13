import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { img_500, unavailable } from "../../config/config";
import "./TrailerSection.css";
import YouTube from "react-youtube";
import Carousel from "../Carousel/Carousel.js"

const TrailerSection = () => {
  const { media_type, id } = useParams();
  const [content, setContent] = useState({});
  const imagePath = "https://image.tmdb.org/t/p/original";
  const [video, setVideo] = useState({});
  const [playTrailer,setPlayTrailer]=useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setContent(data);
  };

  const fetchVideo = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,image,credits`
    );
    const data = await res.json();
    console.log(data);
    setVideo(data);
  };
  

  const renderTrailer=()=>{
    const trailer = video.videos.results.find((vid)=>{
     if(vid.name === "Official Trailer"){
        return vid.name === "Official Trailer" ;
      }
      else{
        return video.videos.results[0].type==='Trailer';
      }
    }    
    )


    return(
      <YouTube videoId = { trailer ? trailer.key : unavailable} className="YouTube"
      opts={{
        width:"100%",
        height:"500px",
      }}
      />
    )
  }
  useEffect(() => {
    fetchData();
    fetchVideo();
    
  }, []);

  return (
    <div className="div">
      <div
        className="mainTrailerSection"
        style={{
          backgroundImage: `url(${imagePath}${content.backdrop_path})`,
        }}
      > 
        {video.videos && playTrailer ? renderTrailer() :unavailable}
        <div className="playbtn1">
        <button className="playbtn" onClick={()=>setPlayTrailer(true)}>Play Trailer</button>
        </div>
      </div>

      <div className="trailersection">
     
        <div className="textsection">
          <div className="titlebtn">
          {playTrailer?<button className="playbtn2" onClick={()=>setPlayTrailer(false)}>Close</button> : null}
          <h1>{content.title || content.name}</h1>
          </div>
          <div className="overview">
          {content.overview ? content.overview : null}
          </div>
          <div className="carousel">
           <Carousel media_type={media_type} id={id}/>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
