import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { ArrowBack } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";

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
  formControl: {
    width: "200px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    padding: theme.spacing(3),
  },
}));

const CheckAccess = ({ drizzle, drizzleState }) => {
  const classes = styles();
  const history = useHistory();

  const [inputDetails, setInputDetails] = useState();

  const [result, setResult] = useState();
  const [dataKey, setDataKey] = useState();

  const handleCheckUser = (e) => {
    e.preventDefault();

    const contract2 = drizzle.contracts.ContactTracingToken;
    const txId = contract2.methods["isTracerByAddress"].cacheCall(
      inputDetails.id,
      {
        from: drizzleState.accounts[0],
      }
    );
    setDataKey(txId);
    setResult({
      id: inputDetails.id,
    });
  };

  const getResult = () => {
    const { ContactTracingToken } = drizzleState.contracts;
    let bool;
    bool = ContactTracingToken.isTracerByAddress[dataKey];
    console.log(bool);
    if (bool) {
      if (bool.value) {
        return (
          <Typography variant="h5">
            This user is a <span style={{ color: "green" }}>registered</span>{" "}
            tracer
          </Typography>
        );
      } else {
        return (
          <Typography variant="h5">
            This user is
            <span style={{ color: "red" }}> not a registered</span> tracer
          </Typography>
        );
      }
    }
    return null;
  };

  const accessRecordsColumns = [
    { field: "date", headerName: "Date (ddmmyy)", width: 300 },
    { field: "time", headerName: "Time (hh:mm:ss)", width: 350 },
    { field: "tracerID", headerName: "TracerID", width: 350 },
  ];

  const accessRecordsRows = [
    {
      id: 1,
      date: "250320",
      time: "14:35:17",
      tracerID: "0xAf32FC6bb0CDBe108A51407dbB100f7Bd94a391C",
    },
    {
      id: 2,
      date: "260320",
      time: "12:35:59",
      tracerID: "0xAf32FC6bb0CDBe108A51407dbB100f7Bd94a391C",
    },
  ];

  return (
    <div>
      <Navbar path="citizen" />
      <div className={classes.content}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => history.push(`/citizen/home`)}
            style={{ marginRight: "20px" }}
          >
            <ArrowBack />
          </IconButton>
          <PageTitle title="Check history of contact tracers tracing my data" />
        </div>
        <Paper className={classes.paper}>
          <div style={{ height: "400px", marginTop: "10px" }}>
            <DataGrid
              rows={accessRecordsRows}
              columns={accessRecordsColumns}
              pageSize={10}
              //checkboxSelection
              disableSelectionOnClick
              onRowClick={(e) => console.log("E")}
            />
          </div>
        </Paper>
        <Divider
          style={{
            height: "1px",
            backgroundColor: "#000000",
            width: "100%",
          }}
        />
        <Paper className={classes.paper}>
          <div style={{ marginTop: "20px" }}>
            <form onSubmit={handleCheckUser}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">Tracer's ID</Typography>
                <TextField
                  variant="outlined"
                  margin="dense"
                  placeholder="Enter Tracer's ID"
                  value={inputDetails ? inputDetails.id : ""}
                  onChange={(e) =>
                    setInputDetails({
                      ...inputDetails,
                      id: e.target.value,
                    })
                  }
                  required
                  autoFocus
                />
              </div>
              {!result && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#B6EFA7" }}
                    type="submit"
                  >
                    Check
                  </Button>
                </div>
              )}
            </form>
          </div>
          {result && result && (
            <div
              style={{
                marginTop: "20px",
                padding: "24px",
                backgroundColor: "#DBDBDB",
                width: "60%",
                marginLeft: "auto",
                marginRight: "auto",
                border: "1px solid #000",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 600,

                    paddingRight: "50px",
                  }}
                >
                  Result
                </Typography>
                {getResult()}
              </div>

              <Typography variant="h6" style={{ paddingBottom: "10px" }}>
                User Type to Check: Tracer
              </Typography>
              <Typography variant="h6" style={{ paddingBottom: "10px" }}>
                ID: {result.id}
              </Typography>
              <Button
                variant="contained"
                onClick={() => history.push(`/govt/home`)}
                style={{
                  backgroundColor: "#164D8F",
                  color: "#fff",
                  marginTop: "10px",
                }}
                onClick={() => {
                  setInputDetails();
                  setResult();
                  setDataKey();
                }}
              >
                Check Another User
              </Button>
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default CheckAccess;
