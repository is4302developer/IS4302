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
import { useHistory } from "react-router";
import { Warning } from "@material-ui/icons";
import Toast from "../components/Toast";

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

const RegisterUser = ({ drizzle, drizzleState }) => {
  const classes = styles();
  const history = useHistory();

  const [sbOpen, setSbOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "error",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });

  const [userType, setUserType] = useState();

  const [registerDetails, setRegisterDetails] = useState();
  const [dataKey, setDataKey] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();

    const contract = drizzle.contracts.ContactTracing;
    if (userType === "citizen") {
      // const txId = contract.methods["registerAdmin"].cacheSend(
      //   drizzleState.accounts[1],
      //   {
      //     from: drizzleState.accounts[0],
      //   }
      // );
    } else if (userType === "tracer") {
      const txId = contract.methods["registerTracer"].cacheSend(
        drizzleState.accounts[0],
        {
          from: drizzleState.accounts[0],
        }
      );
      setDataKey(txId);
    } else if (userType === "admin") {
      const txId = contract.methods["registerAdmin"].cacheSend(
        drizzleState.accounts[0],
        {
          from: drizzleState.accounts[0],
        }
      );
      setDataKey(txId);
      getTxStatus();
    }
  };

  console.log(drizzleState.accounts);

  const getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[dataKey];
    // console.log(transactionStack);

    // if transaction hash does not exist, don't display anything
    // if (!txHash) return null;

    // otherwise, return the transaction status
    // console.log(transactions[txHash] && transactions[txHash].status);
    // return `Transaction status: ${
    //   transactions[txHash] && transactions[txHash].status
    // }`;
    // console.log(txHash && transactions[txHash] && transactions[txHash].status);
    if (
      txHash &&
      transactions[txHash] &&
      transactions[txHash].status === "success"
    ) {
      if (sbOpen === false) {
        setSbOpen(true);
        setSnackbar({
          message: "User registered successfully!",
          severity: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 5000,
        });
        setRegisterDetails({ name: "", nric: "", address: "", mobile: "" });
      }
    }
  };

  return (
    <div>
      <Navbar path="govt" />
      <div className={classes.content}>
        <Toast open={sbOpen} setOpen={setSbOpen} {...snackbar} />
        <PageTitle title="Register User" />
        <div>{getTxStatus()}</div>
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
                  setRegisterDetails({
                    name: registerDetails && registerDetails.name,
                  });
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
            <form onSubmit={handleRegister}>
              {(() => {
                if (userType === "citizen") {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6">NRIC</Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter NRIC"
                        value={registerDetails && registerDetails.nric}
                        onChange={(e) =>
                          setRegisterDetails({
                            ...registerDetails,
                            nric: e.target.value,
                          })
                        }
                        required
                        autoFocus
                      />

                      <Typography variant="h6" style={{ paddingTop: "20px" }}>
                        Name
                      </Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Citizen's Name"
                        value={registerDetails && registerDetails.name}
                        onChange={(e) =>
                          setRegisterDetails({
                            ...registerDetails,
                            name: e.target.value,
                          })
                        }
                        required
                        autoFocus
                      />

                      <Typography variant="h6" style={{ paddingTop: "20px" }}>
                        Address
                      </Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Address"
                        value={registerDetails && registerDetails.address}
                        onChange={(e) =>
                          setRegisterDetails({
                            ...registerDetails,
                            address: e.target.value,
                          })
                        }
                        required
                        multiline
                        rows={4}
                      />

                      <Typography variant="h6" style={{ paddingTop: "20px" }}>
                        Mobile Number
                      </Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Mobile Number"
                        value={registerDetails && registerDetails.mobile}
                        onChange={(e) =>
                          setRegisterDetails({
                            ...registerDetails,
                            mobile: e.target.value,
                          })
                        }
                        required
                        type="number"
                      />
                    </div>
                  );
                } else if (userType === "tracer") {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6">Name</Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Tracer's Name"
                        value={registerDetails && registerDetails.name}
                        onChange={(e) =>
                          setRegisterDetails({
                            ...registerDetails,
                            name: e.target.value,
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
                      <Typography variant="h6">Name</Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Admin's Name"
                        value={registerDetails && registerDetails.name}
                        onChange={(e) =>
                          setRegisterDetails({
                            ...registerDetails,
                            name: e.target.value,
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
                        Please select the type of user to register first
                      </Typography>
                    </div>
                  );
                }
              })()}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "30px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => history.push(`/govt/home`)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#B6EFA7" }}
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default RegisterUser;
