import React from "react";
import { Route, Switch } from "react-router-dom";
import CitizenLoginPage from "../src/citizen/LoginPage";
import TracerLoginPage from "../src/tracer/LoginPage";
import GovtLoginPage from "../src/govt/LoginPage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={CitizenLoginPage} />
      <Route exact path="/tracer" component={TracerLoginPage} />
      <Route exact path="/govt" component={GovtLoginPage} />
    </Switch>
  );
};

export default App;
