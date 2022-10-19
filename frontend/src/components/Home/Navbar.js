import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useScrollYPosition } from "react-use-scroll-position";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { useEffect, useMemo } from "react";
import Search from "./Search";

const Navbar = ({ sidebarwidth }) => {
  const y = useScrollYPosition();

  // console.log(searchTerm, "this is search term");
  // around 185, transparaent

  // 85 start opacity

  // if y > 85
  // console.log(y, "this y");
  //* MUST BE 85
  // let opacityNav = y >= 85 ? 60 + (y - 85) * 0.35 : 50;
  let opacityNav = y >= 85 ? 30 + (y - 85) * 0.35 : 10;
  //* for every 10 difference, increase opacity by 5
  opacityNav = y >= 288 ? 100 : opacityNav;

  const location = useLocation();
  // console.log(location.pathname, "location");

  return (
    <Box className="navbar">
      <div
        style={{
          minWidth: `calc(100vw - ${sidebarwidth}px)`, //THISI S THE CRUX, the issue was that 100% is not the entire screen
          // minWidth: `100%`,
          marginLeft: sidebarwidth + "px",
          backgroundColor: `rgb(9, 9, 9, ${opacityNav / 100}`,
          // opacity: `${opacityNav}%`,
          height: "64px",
          zIndex: "-1",
          display: "flex",
        }}
      >
        <Flex gap={4} alignItems="center" ml={7}>
          <Box
            sx={{
              borderRadius: "34px",
              width: "34px",
              height: "34px",
              backgroundColor: "black",
              paddingTop: "2px",
              paddingLeft: "2px",
            }}
            _hover={{ cursor: "pointer" }}
            _active={{ transform: "scale(1.05)" }}
          >
            <AiOutlineLeft color="white" fontSize={30} />
          </Box>
          <Box
            sx={{
              borderRadius: "34px",
              width: "34px",
              height: "34px",
              backgroundColor: "black",
              paddingTop: "2px",
              paddingLeft: "3px",
            }}
            _hover={{ cursor: "pointer" }}
            _active={{ transform: "scale(1.05)" }}
          >
            <AiOutlineRight
              color="white"
              fontSize={30}
              onClick={() => {
                console.log("hihii");
              }}
            />
          </Box>
        </Flex>
        {location.pathname === "/search" ? <Search /> : null}
        {/* <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div>
        <div style={{ color: "yellow", width: "200px" }}>Hello</div> */}

        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "300px",
            backgroundColor: "green",
            zIndex: "10",
          }}
          ml="auto"
        >
          User placeholder
        </Box>
      </div>
    </Box>
  );
};
export default Navbar;
