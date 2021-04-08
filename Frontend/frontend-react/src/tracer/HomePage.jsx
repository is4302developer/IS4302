import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";

import {
  Button,
  FormControl,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { DataGrid } from "@material-ui/data-grid";
import PageTitle from "../components/PageTitle";
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const styles = makeStyles((theme) => ({
  content: {
    marginTop: "65px",
    padding: theme.spacing(7),
  },
  formControl: {
    width: "200px",
  },
}));

const HomePage = ({ drizzle, drizzleState }) => {
  const classes = styles();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [dataKey, setDataKey] = useState(null);

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   setShow(true);
  // }

  const approveRetrieval = () => {
    const contract = drizzle.contracts.ContactTracing;
    const timestamp = web3.utils.padLeft(new Date());
    // console.log(web3.utils.asciiToHex("HELLO WORLD"));

    // const string = web3.utils.padLeft("HELLO WORLD", 64);
    // console.log(string);
    // console.log(web3.utils.asciiToHex(string));
    const purpose = {};
    const tokenId = 2;
    const txId = contract.methods["approveRetrieval"].cacheSend(
      web3.utils.asciiToHex("HELLO WORLD"),
      web3.utils.asciiToHex("HELLO WORLD"),
      tokenId,
      {
        from: drizzleState.accounts[0],
      }
    );
    console.log(txId);
    setDataKey(txId);
  };

  const getTxtStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;
    const txHash = transactionStack[dataKey];
    if (
      txHash &&
      transactions[txHash] &&
      transactions[txHash].status === "success"
    ) {
      // console.log(transactions[txHash]);
      if (!show) {
        setShow(true);
      }
    }
  };

  const safeEntryColumns = [
    { field: "date", headerName: "Date (ddmmyy)", width: 300 },
    { field: "checkin", headerName: "Check in time (hh:mm:ss)", width: 350 },
    { field: "checkout", headerName: "Check out time (hh:mm:ss)", width: 350 },
    { field: "shopname", headerName: "Shops", width: 350 },
  ];

  // const [safeEntryRows, setSafeEntryRows] = useState([]);
  const safeEntryRows = [
    {
      id: 1,
      date: "250320",
      checkin: "12:30:01",
      checkout: "13:05:23",
      shopname: "NEX BURGER KING",
    },
    {
      id: 2,
      date: "250320",
      checkin: "21:22:15",
      checkout: "23:58:10",
      shopname: "KING'S POOL",
    },
    {
      id: 3,
      date: "260320",
      checkin: "10:50:30",
      checkout: "12:16:34",
      shopname: "TOA PAYOH CENTRAL LIBRARY",
    },
    {
      id: 4,
      date: "260320",
      checkin: "15:06:09",
      checkout: "18:30:48",
      shopname: "NUS SCHOOL OF COMPUTING",
    },
    {
      id: 5,
      date: "270320",
      checkin: "11:30:01",
      checkout: "12:05:17",
      shopname: "NUS THE DECK CANTEEN",
    },
  ];

  // const getDetails = () => {
  //   const { ContactTracing } = drizzleState.contracts;
  //   console.log(ContactTracing);
  //   const getRecords = ContactTracing.getAccessRecords[dataKey];
  //   console.log(getRecords);
  // };

  return (
    <div>
      <Navbar path="tracer" />
      <div className={classes.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageTitle title="Tracer" />
        </div>
        <div>{getTxtStatus()}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography variant="h6" style={{ paddingRight: "20px" }}>
                Enter Citizen's hashed NRIC:
              </Typography>
            </Grid>
            <Grid item>
              <FormControl
                margin="dense"
                variant="outlined"
                className={classes.formControl}
              >
                <TextField
                  id="outlined-basic"
                  label="Type here"
                  variant="outlined"
                  required
                  autoFocus
                />
              </FormControl>
            </Grid>

            <Grid item alignItems="stretch">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => approveRetrieval()}
                style={{ marginLeft: "20px" }}
              >
                Retrieve
              </Button>
            </Grid>
          </Grid>
        </div>
        {show && (
          <div style={{ height: "400px", marginTop: "10px" }}>
            <DataGrid
              rows={safeEntryRows}
              columns={safeEntryColumns}
              pageSize={10}
              //checkboxSelection
              disableSelectionOnClick
              onRowClick={(e) => console.log("E")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
