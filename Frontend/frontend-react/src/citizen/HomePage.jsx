import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Box
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
  content: {
    marginTop: "65px",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginLeft: "400px",
    marginRight: "400px",
    padding: theme.spacing(10),
    elevation: 1,
  },
}));

const HomePage = () => {
  const classes = styles();

  return (
    <div>
      <Navbar path='citizen' />
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" style={{ paddingRight: "20px" }}>
                SAFEENTRY CHECK-IN
              </Typography>
            </Box>
            <Button
              variant="contained"
              style={{ backgroundColor: "#B6EFA7"}}
              type="submit"
              size="large"
            >
              Check In
            </Button>
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" style={{ paddingRight: "20px" }}>
                You last checked in at
              </Typography>
            </Box>
            <Box fontWeight="fontWeightBold">
              <Typography variant="h6" style={{ paddingRight: "20px" }}>
                NEX SHOPPING CENTRE
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              style={{ backgroundColor: "#ff7961"}}
              type="submit"
              size="large"
            >
              Check Out
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;
