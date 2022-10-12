// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotifyLogo from "./SpotifyLogo";
import { logout } from "./store/session";

function App() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let routes = (
    <Switch>
      <Route exact path="/">
        <div>
          {currentUser && currentUser.username
            ? `Current user is ${currentUser.username}`
            : "There is no current user man"}
        </div>
        {currentUser ? (
          <div>
            <button
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <Link to="/signup">Sign up here boi</Link>
        )}
      </Route>

      <Route path="/login">
        {!currentUser ? <LoginFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/signup">
        {!currentUser ? <SignupFormPage /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>{routes}</div>
  );
}

export default App;
