import React from "react";
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
    padding: theme.spacing(5),
  },
}));

const LandingPage = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Typography
          variant="h2"
          style={{ paddingBottom: "20px", color: "#ef6c00", fontWeight: "600" }}
        >
          Contact Tracing
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/citizen/home`)}
          >
            Citizen
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.push(`/tracer/home`)}
          >
            Contact Tracer
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push(`/govt/home`)}
          >
            Government Representative
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default LandingPage;
