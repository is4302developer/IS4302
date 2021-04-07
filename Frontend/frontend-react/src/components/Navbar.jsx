import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, List, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  appBar: {
    // position: "absolute",
    position: "fixed",
    zIndex: "1000",
  },
  toolbar: {
    height: "65px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
  },
  codeineLogo: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  list: {
    display: "flex",
    flexDirection: "row",
  },
}));

const Navbar = ({ path }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    history.push(`/${path}`);
  };

  return (
    <AppBar
      className={classes.appBar}
      style={{ backgroundColor: `#4db6ac` }}
      elevation={5}
    >
      <Toolbar className={classes.toolbar}>
        <div style={{ marginLeft: "auto" }}>
          <Button variant="contained" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
