import { Box } from "@chakra-ui/react";
import { useScrollYPosition } from "react-use-scroll-position";

const Navbar = ({ sidebarwidth }) => {
  const y = useScrollYPosition();

  // around 185, transparaent

  // 85 start opacity

  // if y > 85

  //* MUST BE 85
  let opacityNav = y >= 85 ? 60 + (y - 85) * 0.35 : 50;
  //* for every 10 difference, increase opacity by 5
  opacityNav = y >= 258 ? 100 : opacityNav;

  return (
    <Box className="navbar">
      <div
        style={{
          width: `calc(100vw - ${sidebarwidth}px)`,
          marginLeft: sidebarwidth + "px",
          backgroundColor: "rgb(9, 9, 9)",
          opacity: `${opacityNav}%`,
          height: "64px",
          zIndex: "-1",
        }}
      ></div>
    </Box>
  );
};
export default Navbar;
