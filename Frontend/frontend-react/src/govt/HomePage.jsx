import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navbar";

const styles = makeStyles((theme) => ({
  content: {
    marginTop: "65px",
    padding: theme.spacing(5),
  },
}));

const HomePage = () => {
  const classes = styles();

  return (
    <div>
      <Navbar path="govt" />
      <div className={classes.content}></div>
    </div>
  );
};

export default HomePage;
