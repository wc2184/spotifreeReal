import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./SpotifyCircularFont.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store";
import csrfFetch from "./store/csrf";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { ChakraProvider } from "@chakra-ui/react";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  // window.csrfFetch = csrfFetch;
  // window.sessionActions = sessionActions;
}

function Root() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <Navigation></Navigation> */}
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("currentUser") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
  // store.dispatch(sessionActions.restoreSession());
  // renderApplication();
} else {
  renderApplication();
}
