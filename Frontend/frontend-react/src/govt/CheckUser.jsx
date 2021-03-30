import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";

const styles = makeStyles((theme) => ({
  content: {
    marginTop: "65px",
    padding: theme.spacing(7),
  },
}));

const CheckUser = () => {
  const classes = styles();

  return (
    <div>
      <Navbar path="govt" />
    </div>
  );
};

export default CheckUser;
