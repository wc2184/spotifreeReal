// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SpotifyLogo from "./SpotifyLogo";
import { logout } from "./store/session";

function App() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let routes = (
    <Switch>
      <Route path="/login">
        {!currentUser ? <LoginFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/signup">
        {!currentUser ? <SignupFormPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/">
        {/* <div>
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
        )} */}
        <Home />
      </Route>
    </Switch>
  );
  return <div>{routes}</div>;
}

export default App;
