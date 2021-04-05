import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import DigitalTrace from "./artifacts/Trace.json";
import DigitalToken from "./artifacts/ContactTracing_Token.json";
import ERC721Contract from "./artifacts/ERC721Full.json";

const drizzleOptions = {
  contracts: [DigitalToken, DigitalTrace], // contract names
  events: {},
};

const drizzle = new Drizzle(drizzleOptions);

let render = () => {
  ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {(drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...";
          }

          return (
            <Fragment>
              <BrowserRouter>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <App drizzle={drizzle} drizzleState={drizzleState} />
                </ThemeProvider>
              </BrowserRouter>
            </Fragment>
          );
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>,
    document.getElementById("root")
  );
};

// adding this hot module allows changes to be seen immediately on the local
// host without the page having to be refreshed entirely for changes to be seen
if (module.hot) {
  module.hot.accept("./App", () => {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
