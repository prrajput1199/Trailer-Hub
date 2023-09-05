import React from "react";
import { Pagination, withTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CurrentPage = ({ setPageNo, numberOfPages = 20 }) => {
  const PageChangeHandle = (pageNo) => {
    setPageNo(pageNo);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <div className="pagination"
      style={{
        background:"white",
        color:"black",
        borderRadius:"20px"
      }}
      >
        <ThemeProvider theme={darkTheme}>
          <Pagination
            hideNextButton
            hidePrevButton
            color="primary"
            count={numberOfPages}
            onChange={(event) => PageChangeHandle(event.target.textContent)}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default CurrentPage;
