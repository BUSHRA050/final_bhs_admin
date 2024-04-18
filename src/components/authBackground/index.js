import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import useStyles from "../../globalStyles";

const AuthBackground = ({ children }) => {
  const classes = useStyles();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
            height: "90px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" className={classes.loginHead}>
            BHS Job Portal
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={5}
          md={4}
          style={{ margin: "0 auto", position: "relative", bottom: "-56px" }}
          className={classes.loginContainer}
        >
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthBackground;
