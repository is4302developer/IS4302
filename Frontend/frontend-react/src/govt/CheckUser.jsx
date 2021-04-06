import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { ArrowBack, Warning } from "@material-ui/icons";

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

const CheckUser = ({ drizzle, drizzleState }) => {
  const classes = styles();
  const history = useHistory();

  const [userType, setUserType] = useState();
  const [inputDetails, setInputDetails] = useState();

  const [result, setResult] = useState();
  const [dataKey, setDataKey] = useState();

  const handleCheckUser = (e) => {
    e.preventDefault();

    const contract2 = drizzle.contracts.ContactTracingToken;
    if (userType === "tracer") {
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
    } else if (userType === "admin") {
      const txId = contract2.methods["isAdminByAddress"].cacheCall(
        inputDetails.id,
        {
          from: drizzleState.accounts[0],
        }
      );
      setDataKey(txId);
      setResult({
        id: inputDetails.id,
      });
    }
  };

  const getResult = () => {
    const { ContactTracingToken } = drizzleState.contracts;
    let bool;
    if (userType === "tracer") {
      bool = ContactTracingToken.isTracerByAddress[dataKey];
    } else if (userType === "admin") {
      bool = ContactTracingToken.isAdminByAddress[dataKey];
    }
    if (bool) {
      if (userType === "admin") {
        if (bool.value) {
          return (
            <Typography variant="h5">
              This user is a <span style={{ color: "green" }}>registered</span>{" "}
              admin
            </Typography>
          );
        } else {
          return (
            <Typography variant="h5">
              This user is
              <span style={{ color: "red" }}> not a registered</span> admin
            </Typography>
          );
        }
      } else if (userType === "tracer") {
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
    }
    return null;
  };

  return (
    <div>
      <Navbar path="govt" />
      <div className={classes.content}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => history.push(`/govt/home`)}
            style={{ marginRight: "20px" }}
          >
            <ArrowBack />
          </IconButton>
          <PageTitle title="Check User" />
        </div>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" style={{ paddingRight: "20px" }}>
              Choose User Type
            </Typography>
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>User Type</InputLabel>
              <Select
                label="User Type"
                value={userType ? userType : ""}
                onChange={(e) => {
                  setUserType(e.target.value);
                  setInputDetails();
                  setResult();
                }}
                style={{ backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select a user type</em>
                </MenuItem>
                <MenuItem value="citizen">Citizen</MenuItem>
                <MenuItem value="tracer">Tracer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ marginTop: "20px" }}>
            <form onSubmit={handleCheckUser}>
              {(() => {
                if (userType === "citizen") {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6">Citizen's NRIC</Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Citizen's NRIC"
                        value={inputDetails ? inputDetails.nric : ""}
                        onChange={(e) =>
                          setInputDetails({
                            ...inputDetails,
                            nric: e.target.value,
                          })
                        }
                        required
                        autoFocus
                      />
                    </div>
                  );
                } else if (userType === "tracer") {
                  return (
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
                  );
                } else if (userType === "admin") {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6">Admin's ID</Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Admin's ID"
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
                  );
                } else {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Warning
                        style={{ marginRight: "10px", color: "#f0ae24" }}
                      />
                      <Typography variant="h5">
                        Please select the type of user to check first
                      </Typography>
                    </div>
                  );
                }
              })()}
              {!result && userType && (
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
                User Type to Check: {userType && userType}
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
                  setUserType();
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

export default CheckUser;
