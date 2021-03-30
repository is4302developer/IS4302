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

const RegisterUser = () => {
  const classes = styles();
  const history = useHistory();

  const [userType, setUserType] = useState();

  const [registerDetails, setRegisterDetails] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar path="govt" />
      <div className={classes.content}>
        <PageTitle title="Register User" />
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
                <MenuItem value="shop">Shop</MenuItem>
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
                } else if (userType === "shop") {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6">Name</Typography>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="Enter Shop's Name"
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
