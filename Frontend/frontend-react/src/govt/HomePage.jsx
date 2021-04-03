import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import { Box, Button, Divider, Tab, Tabs, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";

const styles = makeStyles((theme) => ({
  content: {
    marginTop: "65px",
    padding: theme.spacing(7),
  },
  tab: {
    backgroundColor: "#00000000",
    fontWeight: "800",
  },
  tabPanel: {
    minHeight: "200px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const HomePage = ({ drizzle, drizzleState }) => {
  const classes = styles();

  const [dataKey, setDataKey] = useState(null);

  const [value, setValue] = useState(0);
  const tabPanelsArr = [0, 1, 2];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [citizenRows, setCitizenRows] = useState([]);
  const [tracerRows, setTracerRows] = useState([]);
  const [shopRows, setShopRows] = useState([]);

  const init = () => {
    console.log(drizzleState);
    const contract = drizzle.contracts.Trace_Token;
    const contract1 = drizzle.contracts.Trace;
    const value = contract.methods["getOwnerOfContract"].cacheCall();
    const txId = contract1.methods["registerAdmin"].cacheSend(
      drizzleState.accounts[0],
      {
        from: drizzleState.accounts[0],
      }
    );
    setDataKey(txId);
  };

  useEffect(() => {
    init();
    // setDataKey(value);
  }, []);

  const citizenColumns = [
    {
      field: "account_address",
      headerName: "ID",
      width: 300,
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "dob", headerName: "Date of Birth", width: 200 },
    { field: "mobile", headerName: "Mobile Number", width: 200 },
  ];

  const tracerColumns = [
    {
      field: "account_address",
      headerName: "ID",
      width: 400,
    },
    { field: "name", headerName: "Name", width: 300 },
  ];

  const shopColumns = [
    {
      field: "account_address",
      headerName: "ID",
      width: 400,
    },
    { field: "name", headerName: "Shop Name", width: 300 },
  ];

  const getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[dataKey];
    console.log(transactionStack);

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${
      transactions[txHash] && transactions[txHash].status
    }`;
  };

  return (
    <div>
      <Navbar path="govt" />
      <div className={classes.content}>
        <div style={{ display: "flex" }}>
          <div>{getTxStatus()}</div>
          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/govt/home/register"
            >
              Register User
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: "20px" }}
              component={Link}
              to="/govt/home/check"
            >
              Check User
            </Button>
          </div>
        </div>

        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
          classes={{
            root: classes.tabs,
          }}
        >
          <Tab className={classes.tab} label="Citizen" />
          <Tab className={classes.tab} label="Tracer" />
          <Tab className={classes.tab} label="Shop" />
        </Tabs>
        <Divider
          style={{
            height: "1px",
            backgroundColor: "#000000",
            width: "100%",
          }}
        />
        {tabPanelsArr &&
          tabPanelsArr.map((tabPanel, index) => {
            return (
              <TabPanel
                key={index}
                value={value}
                index={tabPanel}
                className={classes.tabPanel}
              >
                {(() => {
                  if (value === 0) {
                    return (
                      <div style={{ height: "400px", marginTop: "10px" }}>
                        <DataGrid
                          rows={citizenRows}
                          columns={citizenColumns}
                          pageSize={10}
                          //checkboxSelection
                          disableSelectionOnClick
                          onRowClick={(e) => console.log("E")}
                        />
                      </div>
                    );
                  } else if (value === 1) {
                    return (
                      <div style={{ height: "400px", marginTop: "10px" }}>
                        <DataGrid
                          rows={tracerRows}
                          columns={tracerColumns}
                          pageSize={10}
                          //checkboxSelection
                          disableSelectionOnClick
                          onRowClick={(e) => console.log("E")}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div style={{ height: "400px", marginTop: "10px" }}>
                        <DataGrid
                          rows={shopRows}
                          columns={shopColumns}
                          pageSize={10}
                          //checkboxSelection
                          disableSelectionOnClick
                          onRowClick={(e) => console.log("E")}
                        />
                      </div>
                    );
                  }
                })()}
              </TabPanel>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
