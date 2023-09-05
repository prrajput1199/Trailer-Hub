import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./singleCardData.css";
import { Badge } from "@mui/material";
import Modalcontent from "../modal/modal";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
const SingleCardData = ({
  poster,
  title,
  Date,
  media_type,
  vote_avg,
  id,
  selectedContent,
  setSelectedContent,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="singleContent"
      >
        <Badge
          badgeContent={vote_avg}
          color={vote_avg > 6 ? "primary" : "secondary"}
        />
        <img
          className="posters"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <div className="text">
          <span>{media_type === "tv" ? "Tv Series" : "Movie"}</span>
          <span>{Date}</span>
        </div>
        
      </div>
    </>
  );
};

export default SingleCardData;
