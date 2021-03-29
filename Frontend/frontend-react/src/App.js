import React from "react";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={<div />} />
      <Route exact path="/tracer" component={<div />} />
      <Route exact path="/govt" component={<div />} />
    </Switch>
  );
};

export default App;
