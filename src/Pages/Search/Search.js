import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/base";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import SingleCardData from "../../component/singleCardData/singleCardData";
import CurrentPage from "../../component/PagesNumber/NumberOfPages";
import "./search.css";
import { Link } from "react-router-dom";

const Search = () => {
  const [type, setType] = useState();
  const [SearchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [content, setContent] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=${process.env.REACT_APP_API_KEY}&query=${SearchValue}&page=${page}&append_to_response=media_type`
    );
    const data = await response.json();
    setContent(data.results);
    setNumberOfPages(data.total_pages);
    console.log(data.results);
  };

  useEffect(() => {
    getMovies();
    window.scroll(0, 0);
  }, [type, page, SearchValue]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          className="searcharea"
          style={{ display: "flex", margin: "15px 0",width:'100%' }}
        >
          <TextField
            style={{
              flex: 1,
            }}
            className="searchArea"
            label="Search"
            variant="filled"
            onChange={(event) => setSearchValue(event.target.value)}
          ></TextField>
        </div>

        <Tabs
          value={type}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          onChange={(Event, newvalue) => {
            setType(newvalue);
            setPage(1);
          }}
          style={{ paddingBottom: "10px" }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content &&
          content.map((element) => {
            return (
              <>
                <Link
                  to={`/search/${type === 0  ? "movie" : "tv"}/${element.id}`}
                  className="link"
                >
                  <SingleCardData
                    key={element.id}
                    poster={element.poster_path}
                    title={element.original_title || element.original_name}
                    Date={element.release_date || element.first_air_date}
                    media_type={type ? "tv" : "movie"}
                    vote_avg={element.vote_average}
                  />
                </Link>
              </>
            );
          })}
        {SearchValue &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No movies found</h2>)}
      </div>
      {numberOfPages > 1 && (
        <CurrentPage setPageNo={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
};

export default Search;
