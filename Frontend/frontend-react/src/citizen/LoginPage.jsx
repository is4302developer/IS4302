import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const styles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    padding: "20px 30px",
  },
}));

const LoginPage = () => {
  const classes = styles();
  const history = useHistory();

  const [loginDetails, setLoginDetails] = useState({
    user: "",
    password: ""
  });

  const handleSubmit = () => {
    history.push(`/citizen/home`);
  };

  const handleUserChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      user: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      password: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5">For Citizen</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="Enter Name"
            value={loginDetails && loginDetails.user}
            onChange={handleUserChange}
            required
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="Password"
            value={loginDetails && loginDetails.password}
            onChange={handlePasswordChange}
            type="password"
            required
          />
          <Button
            variant="outlined"
            style={{ marginTop: "20px" }}
            color="primary"
            type="submit"
          >
            Log In
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default LoginPage;
