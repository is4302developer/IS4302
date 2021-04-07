import React from "react";
import { Route, Switch } from "react-router-dom";
import CitizenLoginPage from "../src/citizen/LoginPage";
import CitizenHomePage from "../src/citizen/HomePage";
import CitizenCheckInPage from "../src/citizen/CheckInPage";
import CitizenCheckInPass from "../src/citizen/CheckInPass";
import CitizenCheckOutPass from "../src/citizen/CheckOutPass";
import CitizenCheckAccess from "../src/citizen/CheckAccess";
import TracerLoginPage from "../src/tracer/LoginPage";
import TracerHomePage from "../src/tracer/HomePage";
import GovtLoginPage from "../src/govt/LoginPage";
import GovtHomePage from "../src/govt/HomePage";
import RegisterUser from "../src/govt/RegisterUser.jsx";
import GovtCheckUser from "./govt/CheckUser";
import LandingPage from "./LandingPage";

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
        path="/citizen/checkaccess"
        render={() => (
          <CitizenCheckAccess drizzle={drizzle} drizzleState={drizzleState} />
        )}
      />
      <Route
        exact
        path="/citizen/checkin"
        render={() => (
          <CitizenCheckInPage drizzle={drizzle} drizzleState={drizzleState} />
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
        path="/tracer/home"
        render={() => (
          <TracerHomePage drizzle={drizzle} drizzleState={drizzleState} />
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
      <Route exact path="/" render={() => <LandingPage />} />
    </Switch>
  );
};

export default App;
