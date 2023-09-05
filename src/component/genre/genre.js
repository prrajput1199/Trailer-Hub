// import { Chip } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from "axios";
import React, { useEffect } from "react";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';



const Genre = ({
  genre,
  setGenre,
  selectedGenre,
  setselectedGenre,
  pageNo,
  setPageNo,
}) => {
  const fetchGenre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}`
    );
    setGenre(data.genres);
  };

  useEffect(() => {
    fetchGenre();
    return () => {
      setGenre([]);
    };
 
  },[pageNo]);

  const AddGenre = (Element) => {
    setselectedGenre([...selectedGenre, Element]);
    setGenre(genre.filter((genre)=>{
      return genre.id !== Element.id;
    }))
    console.log(selectedGenre)
    setPageNo(1);
  };

  const DeleteGenre=(Element)=>{
    setselectedGenre(selectedGenre.filter((genre)=>{
      return genre.id !== Element.id;
    }))
    setGenre([...genre, Element]);
  }

  return (
    <div style={{ padding: "6px 0px" }}>
      {selectedGenre &&
        selectedGenre.map((e) => {
          return (
            <>
              <Chip
                label={e.name}
                key={e.id}
                size="small"
                style={{ margin: "2px", backgroundColor: "red" ,color:"white"}}
                clickable
                onDelete={() => DeleteGenre(e)}
                deleteIcon={<DeleteIcon style={{color:'black'}}/>}
                color="success"
              />
            </>
          )
        })}
      {genre &&
        genre.map((Element) => {
          return (
            <>
              <Chip
                label={Element.name}
                key={Element.id}
                size="small"
                style={{ margin: "2px", backgroundColor: "green", color:'white' }}
                clickable
                onClick={() => AddGenre(Element)}
              />
            </>
          )
        })}
    </div>
  );
};

export default Genre;
