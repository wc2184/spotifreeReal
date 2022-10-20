import {
  Box,
  Button,
  Flex,
  Image,
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
import { BsPlayFill } from "react-icons/bs";

const Home = () => {
  const dispatch = useDispatch();
  let sidebarwidth = 240;
  const user = useSelector((state) => state.session.user);
  const searchTerm = useSelector((state) => state.search.search);
  const currentVideo = useSelector((state) => state.player.song);

  const searchResults = useSelector(
    (state) => state.search.searchResults.items
  );
  const [playerTarget, setPlayerTarget] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(searchResults, "search resultss");
  return (
    <div className="globalwrapper" style={{ maxWidth: "100vw" }}>
      <Navbar sidebarwidth={sidebarwidth} />
      <Sidebar sidebarwidth={sidebarwidth} />
      <Player
        playerTarget={playerTarget}
        setPlayerTarget={setPlayerTarget}
        loading={loading}
        setLoading={setLoading}
      />
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
            {/* idea, put first 4 on the right side, then slice(5) */}
            <Box mb={5}>{/* Searching for "{searchTerm}" */}</Box>
            {searchTerm === "" ? null : (
              <Box
                className="topResultAndSongsFlexContainer"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "40px",
                    marginLeft: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDir: "column",
                      marginBottom: "80px",
                      flex: "1 0 30%",
                    }}
                    height="250px"
                    width="430px"
                  >
                    <Text
                      sx={{ flex: "1 0 15%" }}
                      color="white"
                      fontWeight="700"
                      fontSize="25px"
                      mb={4}
                    >
                      Top result
                    </Text>
                    <Box
                      sx={{
                        flex: "1 0 85%",
                        // border: "1px solid white",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "rgb(24, 24, 24)",
                        // transition: "all .9 ease",
                        WebkitTransition: "background-color .3s ease", // transition doesn't work for some reason, this is borrowed from spotify
                      }}
                      _hover={{
                        backgroundColor: "rgb(40, 40, 40)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        console.log(loading, "this his loading before");
                        dispatch(setCurrentSong(searchResults[0].id.videoId));
                        //BOOKMARK playerTarget.seekTo(val)
                        if (currentVideo === searchResults[0].id.videoId) {
                          playerTarget.seekTo(0);
                          return;
                        }

                        const playVideoCheck = setInterval(() => {
                          // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william
                          console.log("should play vid");
                          setLoading((loading) => {
                            console.log(loading, "this is loading");
                            if (!loading) {
                              setPlayerTarget((playerTarget) => {
                                console.log("finally playing vid");
                                setTimeout(() => {
                                  playerTarget.playVideo();
                                }, 200);
                                return playerTarget;
                              });
                              clearInterval(playVideoCheck);
                            }
                            return loading;
                          });

                          // playerTarget.playVideo();
                        }, 300);
                      }}
                    >
                      <Image
                        w="120px"
                        h="100px"
                        mb={5}
                        borderRadius={10}
                        boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                        src={
                          searchResults.length > 0 &&
                          searchResults[0].snippet.thumbnails.default.url
                        }
                      ></Image>
                      {/* {searchResults.length > 0 && searchResults[0].snippet.title} */}
                      <Box>
                        {/* good parsed title and channel */}
                        <Box
                          fontSize="30px"
                          fontWeight={700}
                          letterSpacing="-1.5px"
                          mb={1}
                          sx={{
                            textOverflow: "ellipsis", //overflow but just simply
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxHeight: "50px",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              searchResults.length > 0 &&
                              searchResults[0].snippet.title.replace(
                                searchResults[0].snippet.channelTitle
                                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                  .replace("VEVO", "") + "- ",
                                ""
                              ),
                          }}
                        ></Box>

                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            mt="1px"
                            ml="1px"
                            fontSize={15}
                            color="rgb(179, 179, 179)"
                          >
                            {searchResults.length > 0 &&
                              searchResults[0].snippet.channelTitle
                                .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                .replace("VEVO", "")}
                          </Box>
                          <Box
                            sx={{
                              fontWeight: "700",
                              fontSize: "13px",
                              backgroundColor: "rgb(19, 19, 19)",
                              width: "64px",
                              borderRadius: "20px",
                              padding: "3px 3px",
                              textAlign: "center",
                              marginLeft: "8px",
                              marginTop: "2px",
                            }}
                          >
                            SONG
                          </Box>
                          <Box
                            sx={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "48px",
                              backgroundColor: "rgb(30, 215, 96)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "auto",
                              marginRight: "5px",
                              boxShadow: "0px 8px 24px rgb(0, 0, 0, .7)",
                            }}
                            _hover={{
                              transform: "scale(1.05)",
                            }}
                            _active={{
                              transform: "scale(.95)",
                            }}
                          >
                            <BsPlayFill
                              style={{ marginLeft: "2px" }}
                              color="black"
                              size={30}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ flex: "1 0 60%" }}>
                    <Text
                      sx={{ flex: "1 0 15%" }}
                      color="white"
                      fontWeight="700"
                      fontSize="25px"
                      mb={4}
                    >
                      Songs
                    </Text>
                    <Box>
                      {searchResults.slice(1, 5).map((ele) => {
                        return (
                          <Box
                            _hover={{
                              // pointer: "cursor",
                              cursor: "pointer",
                              backgroundColor: "rgb(42, 42, 42)",
                            }}
                            sx={{
                              height: "60px",
                              borderRadius: "4px",
                              padding: "5px 10px",
                              // border: "1px solid white",
                              zIndex: 5,
                              display: "flex",
                            }}
                            onClick={() => {
                              console.log(loading, "this his loading before");
                              dispatch(setCurrentSong(ele.id.videoId));
                              if (currentVideo === ele.id.videoId) {
                                playerTarget.seekTo(0);
                                return;
                              }
                              const playVideoCheck = setInterval(() => {
                                // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william
                                console.log("should play vid");
                                setLoading((loading) => {
                                  console.log(loading, "this is loading");
                                  if (!loading) {
                                    setPlayerTarget((playerTarget) => {
                                      console.log("finally playing vid");
                                      setTimeout(() => {
                                        playerTarget.playVideo();
                                      }, 200);
                                      return playerTarget;
                                    });
                                    clearInterval(playVideoCheck);
                                  }
                                  return loading;
                                });

                                // playerTarget.playVideo();
                              }, 300);
                            }}
                          >
                            <Image
                              mt="5px"
                              w="50px"
                              h="40px"
                              mb={5}
                              mr="14px"
                              boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                              src={
                                searchResults.length > 0 &&
                                ele.snippet.thumbnails.default.url
                              }
                            ></Image>
                            <Box>
                              <Box
                                sx={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  paddingTop: "1px",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    searchResults.length > 0 &&
                                    ele.snippet.title.replace(
                                      ele.snippet.channelTitle
                                        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                        .replace("VEVO", "") + "- ",
                                      ""
                                    ),
                                }}
                              ></Box>
                              <Box
                                dangerouslySetInnerHTML={{
                                  __html:
                                    searchResults.length > 0 &&
                                    ele.snippet.channelTitle
                                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                      .replace("VEVO", ""),
                                }}
                              ></Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>

                <Box mt={3}>
                  {/* {searchResults.slice(5).map((ele) => {
                  return (
                    <Box
                      _hover={{
                        // pointer: "cursor",
                        cursor: "pointer",
                      }}
                      sx={{
                        height: "30px",
                        border: "1px solid white",
                        zIndex: 5,
                      }}
                      dangerouslySetInnerHTML={{ __html: ele.snippet.title }}
                      onClick={() => {
                        console.log(loading, "this his loading before");
                        dispatch(setCurrentSong(ele.id.videoId));
                        if (currentVideo === ele.id.videoId) {
                          playerTarget.seekTo(0);
                          return;
                        }
                        const playVideoCheck = setInterval(() => {
                          // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william
                          console.log("should play vid");
                          setLoading((loading) => {
                            console.log(loading, "this is loading");
                            if (!loading) {
                              setPlayerTarget((playerTarget) => {
                                console.log("finally playing vid");
                                setTimeout(() => {
                                  playerTarget.playVideo();
                                }, 200);
                                return playerTarget;
                              });
                              clearInterval(playVideoCheck);
                            }
                            return loading;
                          });

                          // playerTarget.playVideo();
                        }, 300);
                      }}
                    ></Box>
                  );
                })} */}
                  {searchResults.slice(5).map((ele) => {
                    return (
                      <Box
                        _hover={{
                          // pointer: "cursor",
                          cursor: "pointer",
                          backgroundColor: "rgb(42, 42, 42)",
                        }}
                        sx={{
                          height: "60px",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          // border: "1px solid white",
                          zIndex: 5,
                          display: "flex",
                        }}
                        onClick={() => {
                          console.log(loading, "this his loading before");
                          dispatch(setCurrentSong(ele.id.videoId));
                          if (currentVideo === ele.id.videoId) {
                            playerTarget.seekTo(0);
                            return;
                          }
                          const playVideoCheck = setInterval(() => {
                            // because setInterval and setTimeout has closure effects, there's literally no way to get the latest state without using the implicitly passed argument trick in the setState to retrieve the latest value and then just return the original state - william
                            console.log("should play vid");
                            setLoading((loading) => {
                              console.log(loading, "this is loading");
                              if (!loading) {
                                setPlayerTarget((playerTarget) => {
                                  console.log("finally playing vid");
                                  setTimeout(() => {
                                    playerTarget.playVideo();
                                  }, 200);
                                  return playerTarget;
                                });
                                clearInterval(playVideoCheck);
                              }
                              return loading;
                            });

                            // playerTarget.playVideo();
                          }, 300);
                        }}
                      >
                        <Image
                          mt="5px"
                          w="50px"
                          h="40px"
                          mb={5}
                          mr="14px"
                          boxShadow="0 8px 24px rgb(0, 0, 0, .5)" // goat box shadow
                          src={
                            searchResults.length > 0 &&
                            ele.snippet.thumbnails.default.url
                          }
                        ></Image>
                        <Box>
                          <Box
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              paddingTop: "1px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html:
                                searchResults.length > 0 &&
                                ele.snippet.title.replace(
                                  ele.snippet.channelTitle
                                    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                    .replace("VEVO", "") + "- ",
                                  ""
                                ),
                            }}
                          ></Box>
                          <Box
                            dangerouslySetInnerHTML={{
                              __html:
                                searchResults.length > 0 &&
                                ele.snippet.channelTitle
                                  .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                                  .replace("VEVO", ""),
                            }}
                          ></Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
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
