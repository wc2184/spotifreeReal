// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Home from "./components/Home";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotifyLogo from "./SpotifyLogo";
import { logout } from "./store/session";

function App() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const location = useLocation();

  let routes = (
    <Switch>
      <Route path="/login">
        {!currentUser ? <LoginFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/signup">
        {!currentUser ? <SignupFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
  console.log(
    location.pathname,
    "pathname",
    location.pathname != "/login" || location.pathname != "/signup"
  );
  return (
    <div style={{ height: "100%" }}>
      {location.pathname != "/login" && location.pathname != "/signup" ? (
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgb(18, 18, 18)",
            zIndex: "-100",
          }}
        ></div>
      ) : null}
      {routes}
    </div>
  );
}

export default App;
