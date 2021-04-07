import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import {
  Button,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
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
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginLeft: "350px",
    marginRight: "350px",
    padding: theme.spacing(5),
    elevation: 1,
  },
}));

const HomePage = () => {
  const classes = styles();
  const history = useHistory();

  return (
    <div>
      <Navbar path='citizen' />
      <div className={classes.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageTitle title="Citizen" />
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: "auto" }}
              component={Link}
              to="/citizen/checkaccess"
            >
              Check Access Records
            </Button>
          </div>
        </div>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" style={{ paddingRight: "20px" }}>
                SAFEENTRY CHECK-IN
              </Typography>
            </Box>
            <Box style={{ paddingLeft: "290px" }}>
              <Button 
                variant="contained" 
                style={{ backgroundColor: "#B6EFA7"}} 
                onClick={() => history.push(`/citizen/checkin`)}
              >
                Check In
              </Button>
            </Box>
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography variant="h6" style={{ paddingBottom: "5px" }}>
                You last checked in at
              </Typography>
              <Typography variant="h3">
                NEX SHOPPING CENTRE
              </Typography>
              <Typography variant="h6" style={{ paddingTop: "5px" }}>
                <Link onClick={() => history.push(`/citizen/checkinpass`)}>
                  View check-in pass
                </Link>
              </Typography>
            </Box>
            <Box style={{ paddingLeft: "150px" }}>
              <Button 
                variant="contained" 
                style={{ backgroundColor: "#ff7961"}} 
                onClick={() => history.push(`/citizen/checkoutpass`)}
              >
                Check Out
              </Button>
            </Box>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default HomePage;
