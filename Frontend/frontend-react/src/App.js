import React from "react";
import { Route, Switch } from "react-router-dom";
import CitizenLoginPage from "../src/citizen/LoginPage";
import CitizenHomePage from "../src/citizen/HomePage";
import CitizenCheckInPass from "../src/citizen/CheckInPass";
import CitizenCheckOutPass from "../src/citizen/CheckOutPass";
import TracerLoginPage from "../src/tracer/LoginPage";
import GovtLoginPage from "../src/govt/LoginPage";
import GovtHomePage from "../src/govt/HomePage";
import RegisterUser from "../src/govt/RegisterUser.jsx";
import GovtCheckUser from "./govt/CheckUser";

const App = ({ drizzle, drizzleState }) => {
  return (
    <Switch>
      <Route
        exact
        path="/citizen"
        render={() => (
          <CitizenLoginPage drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/citizen/home"
        render={() => (
          <CitizenHomePage drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/citizen/checkinpass"
        render={() => (
          <CitizenCheckInPass drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/citizen/checkoutpass"
        render={() => (
          <CitizenCheckOutPass drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/tracer"
        render={() => (
          <TracerLoginPage drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/govt"
        render={() => (
          <GovtLoginPage drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/govt/home"
        render={() => (
          <GovtHomePage drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/govt/home/register"
        render={() => (
          <RegisterUser drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/govt/home/check"
        render={() => (
          <GovtCheckUser drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
    </Switch>
  );
};

export default App;
