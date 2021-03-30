import React from "react";
import { Route, Switch } from "react-router-dom";
import CitizenLoginPage from "../src/citizen/LoginPage";
import TracerLoginPage from "../src/tracer/LoginPage";
import GovtLoginPage from "../src/govt/LoginPage";
import GovtHomePage from "../src/govt/HomePage";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={CitizenLoginPage} />
      <Route exact path="/tracer" component={TracerLoginPage} />
      <Route exact path="/govt" component={GovtLoginPage} />
      <Route exact path="/govt/home" component={GovtHomePage} />
    </Switch>
  );
};

export default App;
