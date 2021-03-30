import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";

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

  const [loginDetails, setLoginDetails] = useState();
  const handleSubmit = () => {};

  const handleInputChange = (e) => {
    setLoginDetails(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5">For Tracer</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            placeholder="Enter Tracer Name"
            value={loginDetails && loginDetails}
            onChange={handleInputChange}
            required
            autoFocus
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
