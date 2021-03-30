import React from "react";
import { Route, Switch } from "react-router-dom";
import CitizenLoginPage from "../src/citizen/LoginPage";
import TracerLoginPage from "../src/tracer/LoginPage";
import GovtLoginPage from "../src/govt/LoginPage";
import GovtHomePage from "../src/govt/HomePage";
import RegisterUser from "../src/govt/RegisterUser.jsx";
import GovtCheckUser from "./govt/CheckUser";

const App = () => {
  return (
    <Switch>
      <Route exact path="/citizen" component={CitizenLoginPage} />
      <Route exact path="/tracer" component={TracerLoginPage} />
      <Route exact path="/govt" component={GovtLoginPage} />
      <Route exact path="/govt/home" component={GovtHomePage} />
      <Route exact path="/govt/home/register" component={RegisterUser} />
      <Route exact path="/govt/home/check" component={GovtCheckUser} />
    </Switch>
  );
};

export default App;
