import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import dashboardStyles from "./style";
import RemoveIcon from "@mui/icons-material/Remove";

const DashboardHeadear = ({ allRestaurants, restVal, setRestVal }) => {
  const classes = dashboardStyles();

  const handleChangeRest = (event) => {
    setRestVal(event.target.value);
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={2}>
          <FormControl
            className={classes.durationSelect}
            size="small"
            fullWidth
          >
            <Select displayEmpty value={duration} onChange={handleChange}>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="">All</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            variant="outlined"
            required
            id="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            autoFocus
            type="date"
            size="small"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            variant="outlined"
            required
            id="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            autoFocus
            type="date"
            size="small"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} textAlign="end">
          <Button
            variant="contained"
            className={classes.loginBtn}
            size="small"
            // onClick={handleLogin}
            disableRipple
          >
            <Typography className={classes.loginBtnText}>Reset</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardHeadear;
