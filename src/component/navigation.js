import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/material";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("Trending");
    } else if (value === 1) {
      navigate("Movies");
    } else if (value === 2) {
      navigate("Tvseries");
    } else if (value === 3) {
      navigate("Search");
    }
  }, [value]);

  return (
    <ThemeProvider>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          zIndex: 100,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ backgroundColor: "rgb(48, 44, 44)" }}
        >
          <BottomNavigationAction
            label="Trending"
            style={{
              backgroundColor: value === 0 ? "white" : "rgb(48, 44, 44)",
              color: value === 0 ? "black" : "white",
            }}
            icon={<WhatshotIcon />}
          />
          <BottomNavigationAction
            label="Movies"
            style={{
              backgroundColor: value === 1 ? "white" : "rgb(48, 44, 44)",
              color: value === 1 ? "black" : "white",
            }}
            icon={<TheatersIcon />}
          />
          <BottomNavigationAction
            label="Tvseries"
            style={{
              backgroundColor: value === 2 ? "white" : "rgb(48, 44, 44)",
              color: value === 2 ? "black" : "white",
            }}
            icon={<TvIcon />}
          />
          <BottomNavigationAction
            label="Search"
            style={{
              backgroundColor: value === 3 ? "white" : "rgb(48, 44, 44)",
              color: value === 3 ? "black" : "white",
            }}
            icon={<SavedSearchIcon/>}
          />
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}
