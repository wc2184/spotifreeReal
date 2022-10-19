import {
  Box,
  Button,
  Flex,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import "./Home.css";
import SpotifyLogo from "../../SpotifyLogo";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Route, Switch } from "react-router-dom";
import Lorem from "./Lorem";
import MainContentWrapper from "./MainContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useCallback, useEffect, useState } from "react";
import Player from "./Player";
import { setCurrentSong } from "../../store/player";
const Home = () => {
  const dispatch = useDispatch();
  let sidebarwidth = 240;
  const user = useSelector((state) => state.session.user);
  const searchTerm = useSelector((state) => state.search.search);
  const searchResults = useSelector(
    (state) => state.search.searchResults.items
  );
  const [playerTarget, setPlayerTarget] = useState(null);

  return (
    <div className="globalwrapper" style={{ maxWidth: "100vw" }}>
      <Navbar sidebarwidth={sidebarwidth} />
      <Sidebar sidebarwidth={sidebarwidth} />
      <Player playerTarget={playerTarget} setPlayerTarget={setPlayerTarget} />
      {/* <Box className="homecontainer">
          <Box
            style={{ backgroundColor: "rgb(18, 18, 18)" }}
            className="maincontent"
          ></Box>
        </Box> */}

      <Route exact path="/">
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
          <div
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "64px",
              color: "white",
            }}
          >
            .{searchTerm}
            {searchResults.map((ele) => {
              return (
                <Box
                  _hover={{
                    // pointer: "cursor",
                    cursor: "pointer",
                  }}
                  sx={{ height: "30px", border: "1px solid white", zIndex: 5 }}
                  dangerouslySetInnerHTML={{ __html: ele.snippet.title }}
                  onClick={() => {
                    dispatch(setCurrentSong(ele.id.videoId));
                    setTimeout(() => {
                      playerTarget.playVideo();
                      console.log("should play vid");
                    }, 2000);
                  }}
                ></Box>
              );
            })}
          </div>
          {/* {user && user.username + "is the current user! "} <br />
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
            <Button
              onClick={() => {
                dispatch(setCurrentSong("i1nindf1meE"));
              }}
              colorScheme="gray"
            >
              change to kanye
            </Button>
            <Button
              onClick={() => {
                dispatch(setCurrentSong("bsgBUM2Mnsw"));
              }}
              colorScheme="red"
            >
              change to changmo
            </Button>
          </div> */}
        </MainContentWrapper>
      </Route>
      <Route exact path="/library">
        <MainContentWrapper sidebarwidth={sidebarwidth}>
          {user && user.username + "is the current user! "} <br />
          frfdsonny the goat we in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          librarywe in the librarywe in the librarywe in the librarywe in the
          library
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
