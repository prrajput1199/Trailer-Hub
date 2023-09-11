import React from "react";
import Header from "./component/Header/header.js";
import "./App.css";
import SimpleBottomNavigation from "./component/navigation.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Trending from "./Pages/Trending/Trending.js";
import Movies from "./Pages/Movies/Movies.js";
import Tvseries from "./Pages/Tvseries/Tvseries.js";
import Search from "./Pages/Search/Search.js";
import TrailerSection from "./component/TrailerSection/TrailerSection.js";
import TrailerSectionMovies from "./Pages/TrailerSectionMTV/TrailerSectionMovies.js";
import TrailerSectionTV from "./Pages/TrailerSectionMTV/TrailerSectionTV.js";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY;

  return (
    <BrowserRouter>
      <Header/>
      <div className="App">
        <Container sx={{width:'100%',backgroundColor:'#00000059'}}>
          <Routes>
            <Route exact path="/Trending"  element={<Trending/>} />
            <Route path="/Trending/:media_type/:id" element={<TrailerSection/>}/>
            <Route path="/Movies" element={<Movies/>} />
            <Route path="/Movies/:id" element={<TrailerSectionMovies/>}/>
            <Route path="/tvseries" element={<Tvseries/>}/>
            <Route path="/tvseries/:id" element={<TrailerSectionTV/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/search/:media_type/:id" element={<TrailerSection/>}/>
          </Routes>
        </Container>
      </div>
      
      <div className="simplebottomnavigation">
      <SimpleBottomNavigation/>
      </div>
      
    </BrowserRouter>
  );
};

export default App;
