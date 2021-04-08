import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import { Button, Paper, Typography, Box, Icon } from "@material-ui/core";
import { useHistory } from "react-router";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PageTitle from "../components/PageTitle";

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
  papertop: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginLeft: "450px",
    marginRight: "450px",
    padding: theme.spacing(3),
    elevation: 1,
    backgroundColor: "#ff7961",
    square: false,
  },
  paperbottom: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5px",
    marginLeft: "450px",
    marginRight: "450px",
    padding: theme.spacing(5),
    elevation: 1,
  },
  button: {
    marginTop: "50px",
    marginLeft: "550px",
    marginRight: "550px",
    backgroundColor: "#ff7961",
  },
  info: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const HomePage = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <div>
      <Navbar path="citizen" />
      <div className={classes.content}>
        <Paper className={classes.papertop}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Icon style={{ paddingLeft: "40px" }}>
                <TransferWithinAStationIcon
                  style={{ width: "60px", height: "60px" }}
                />
              </Icon>
            </Box>
            <Typography variant="h1" style={{ paddingLeft: "40px" }}>
              Safe Entry Check-out
            </Typography>
          </div>
        </Paper>
        <Paper className={classes.paperbottom}>
          <div>
            <Box>
              <Typography variant="h4" align="center" className={classes.info}>
                27 Mar 2021,
              </Typography>
              <Typography variant="h4" align="center" className={classes.info}>
                12:05 PM
              </Typography>
              <Typography variant="h2" align="center" className={classes.info}>
                NEX BURGER KING
              </Typography>
            </Box>
          </div>
        </Paper>
        <Button
          className={classes.button}
          type="submit"
          onClick={() => history.push(`/citizen/home`)}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
