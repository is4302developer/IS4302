import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const styles = makeStyles((theme) => ({}));

const LoginPage = () => {
  const classes = styles();
  const history = useHistory();

  return <div>HELLO</div>;
};

export default LoginPage;
