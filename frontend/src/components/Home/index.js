import { Box, Button, Flex, Text } from "@chakra-ui/react";
import "./Home.css";
import SpotifyLogo from "../../SpotifyLogo";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";
import Lorem from "./Lorem";
import MainContentWrapper from "./MainContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
const Home = () => {
  const dispatch = useDispatch();
  let sidebarwidth = 240;
  const user = useSelector((state) => state.session.user);
  console.log(user, "this is user");
  return (
    <div>
      <Navbar sidebarwidth={sidebarwidth} />
      <Sidebar sidebarwidth={sidebarwidth} />
      <Route exact path="/">
        {/* <Box className="homecontainer">
          <Box
            style={{ backgroundColor: "rgb(18, 18, 18)" }}
            className="maincontent"
          ></Box>
        </Box> */}
        <MainContentWrapper sidebarwidth={sidebarwidth}>
          {user && user.username + "is the current user! "} <br />
          <Lorem />
          <div>
            <Button
              colorScheme="green"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </Button>
          </div>
        </MainContentWrapper>
      </Route>
      <Route exact path="/search">
        <MainContentWrapper sidebarwidth={sidebarwidth}>
          {user && user.username + "is the current user! "} <br />
          kyungmin the goat this is search ipsum dolor sit amet, consectetur
          adipisicing elit. Eveniet, in reprehenderit! Voluptas ipsa cumque
          consectetur optio ut, atque consequuntur magnam numquam maxime
          molestias totam nesciunt fugiat eum facilis dolores deleniti.
          <div>
            <Button
              colorScheme="green"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </Button>
          </div>
        </MainContentWrapper>
      </Route>
      <Route exact path="/library">
        <MainContentWrapper sidebarwidth={sidebarwidth}>
          {user && user.username + "is the current user! "} <br />
          ronny the goat we in the librarywe in the librarywe in the librarywe
          in the librarywe in the librarywe in the librarywe in the librarywe in
          the librarywe in the librarywe in the librarywe in the librarywe in
          the librarywe in the librarywe in the librarywe in the librarywe in
          the librarywe in the librarywe in the librarywe in the librarywe in
          the librarywe in the librarywe in the librarywe in the library
          <div>
            <Button
              colorScheme="green"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log out
            </Button>
          </div>
        </MainContentWrapper>
      </Route>
    </div>
  );
};
export default Home;
