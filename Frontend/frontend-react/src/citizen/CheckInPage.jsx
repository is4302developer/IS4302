import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { DataGrid } from "@material-ui/data-grid";

const styles = makeStyles((theme) => ({
  content: {
    marginTop: "65px",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
  },
  formControl: {
    width: "350px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    padding: theme.spacing(3),
    alignItems: "center",
  },
  dataGrid: {
    "@global": {
      ".MuiDataGrid-row": {
        cursor: "pointer",
      },
    },
  },
}));

const shopColumns = [
  { field: "shopname", headerName: "Shop Name", width: 400 },
];

const shopRows = [
  { id: 1, shopname: "NEX BURGER KING" },
  { id: 2, shopname: "KING'S POOL" },
  { id: 3, shopname: "TOA PAYOH CENTRAL LIBRARY" },
  { id: 4, shopname: "NUS SCHOOL OF COMPUTING" },
  { id: 5, shopname: "NUS THE DECK CANTEEN" },
];

const HomePage = () => {
  const classes = styles();
  const history = useHistory();

  const [place, setPlace] = useState();

  return (
    <div>
      <Navbar path="citizen" />
      <div className={classes.content}>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" style={{ paddingRight: "20px" }}>
              Check in to:
            </Typography>
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                id="outlined-basic"
                label="Shop name"
                variant="outlined"
                required
                autoFocus
                value={place ? place : ""}
                onChange={(e) => setPlace(e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              style={{ backgroundColor: "#B6EFA7" }}
              type="submit"
              size="large"
              onClick={() => history.push(`/citizen/checkinpass`)}
            >
              Go!
            </Button>
          </div>
        </Paper>
        <Divider
          style={{
            height: "1px",
            backgroundColor: "#000000",
            width: "100%",
          }}
        />
        <div
          style={{
            height: "400px",
            marginTop: "10px",
            paddingLeft: "150px",
            paddingRight: "150px",
          }}
        >
          <Typography variant="h4" style={{ alignItems: "center" }}>
            Favourites
          </Typography>
          <DataGrid
            className={classes.dataGrid}
            rows={shopRows}
            columns={shopColumns}
            pageSize={10}
            //checkboxSelection
            disableSelectionOnClick
            onRowClick={(e) => setPlace(e.row.shopname)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
