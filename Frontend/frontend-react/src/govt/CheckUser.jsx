import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

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
