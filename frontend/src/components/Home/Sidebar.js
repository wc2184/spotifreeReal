import { Box, Flex, Text } from "@chakra-ui/react";
import SpotifyLogo from "../../SpotifyLogo";
import { MdHomeFilled } from "react-icons/md";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { BiLibrary } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarwidth }) => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Box className="sidebar">
      <div
        style={{
          backgroundColor: "black",
          width: sidebarwidth + "px",
          height: "100vh",
          zIndex: "0",
          position: "fixed", // position relative lest you use z index
        }}
      >
        <Flex h="100%" flexDir="column">
          <SpotifyLogo
            size={140}
            color="white"
            style={{ marginLeft: "24px", marginTop: "5px" }}
          />
          <Box style={{ color: "whitesmoke" }}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              pl={6}
              //   mb={3}
              pb={3}
              as={Link}
              to="/"
            >
              <MdHomeFilled
                color={
                  location.pathname === "/" ? "white" : "rgb(179, 179, 179)"
                }
                size={35}
              />
              <Text
                ml="10.5px"
                mt={1}
                fontFamily="Circular"
                color={
                  location.pathname === "/" ? "white" : "rgb(179, 179, 179)"
                }
                fontWeight={500}
              >
                Home
              </Text>
            </Box>
            {/*  */}
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              pl={6}
              ml={0.5}
              //   mb={3}
              pb={3}
              as={Link}
              to="/search"
            >
              {location.pathname === "/search" ? (
                <>
                  <RiSearchLine color="white" size={30} />
                  <div
                    style={{
                      position: "absolute",
                      top: "151.2px",
                      left: "29px",
                    }}
                  >
                    <svg width="20px" height="20px">
                      <path
                        fill="white"
                        d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                      ></path>
                    </svg>
                  </div>
                </>
              ) : (
                // <RiSearchFill color="white" size={30} />
                // <div
                //   style={{
                //     paddingTop: "2px",
                //     paddingBottom: "2.5px",
                //     marginRight: "1.5px",
                //   }}
                // >
                //   <svg
                //     role="img"
                //     height="24"
                //     width="28"
                //     class="Svg-ytk21e-0 jAKAlG search-active-icon"
                //     aria-hidden="true"
                //     viewBox="0 1 20 20"
                //   >
                //     <path
                //       fill="white"
                //       d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
                //     ></path>
                //     <path
                //       fill="white"
                //       d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
                //     ></path>
                //   </svg>
                // </div>
                <RiSearchLine color="rgb(179, 179, 179)" size={30} />
              )}
              <Text
                ml="14px"
                fontFamily="Circular"
                color={
                  location.pathname === "/search"
                    ? "white"
                    : "rgb(179, 179, 179)"
                }
                fontWeight={500}
              >
                Search
              </Text>
            </Box>
            {/*  */}
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              pl={6}
              ml="2px"
              //   mb={3}
              pb={3}
              as={Link}
              to="/library"
            >
              <BiLibrary
                color={
                  location.pathname === "/library"
                    ? "white"
                    : "rgb(179, 179, 179)"
                }
                size={30}
              />
              <Text
                ml="13px"
                fontFamily="Circular"
                color={
                  location.pathname === "/library"
                    ? "white"
                    : "rgb(179, 179, 179)"
                }
                fontWeight={500}
              >
                Your Library
              </Text>
            </Box>
          </Box>
          <Box></Box>
        </Flex>
      </div>
    </Box>
  );
};
export default Sidebar;
