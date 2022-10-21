import { useCallback, useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { searchYoutube, setSearch } from "../../store/search";
import { FiSearch } from "react-icons/fi";

const Search = ({ submitted, setSubmitted }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.search);
  const searchResults = useSelector((state) => state.search.searchResults);
  const ref = useRef();
  console.log(searchTerm, "thsi is search term");
  ref.current = searchTerm;
  console.log(ref, "this is ref");

  //   useEffect(() => {
  //     const searchInterval = setInterval(() => {
  //       console.log(searchTerm, "search termmy in intervally");
  //       console.log(ref, "search ref inside ");
  //     }, 1000);
  //     return () => {
  //       clearInterval(searchInterval);
  //     };
  //   }, [searchTerm]);

  //     const updateLive = () => {
  //       console.log(searchTerm);
  //       return searchTerm;
  //     };
  //     const searchNowDebounce = () => {
  //       console.log("search now");
  //       // let liveterm = useSelector((state) => state.search.search);
  //       (() => updateLive())();
  //       // console.log(liveterm);
  //       console.log(searchTerm, "buggy searchterm");
  //     };
  //     console.log(searchTerm, "searchTerm");
  //     const debouncedSearch = useMemo(() => {
  //       return debounce(searchNow, 1000);
  //     }, []);

  //     useEffect(() => {
  //       return () => {
  //         debouncedSearch.cancel();
  //       };
  //     }, [searchTerm]);

  const searchNow = () => {
    console.log(searchTerm, "this is searchTerm");
    dispatch(searchYoutube(searchTerm)).then(() => {
      setTimeout(() => {
        // setSubmitted(true);
      }, 200);
      window.scrollTo(0, 0);
    });
  };
  //   console.log(searchTerm, "da search");
  //   console.log(searchResults, "da search");
  return (
    <>
      <InputGroup
        sx={{ display: "flex", marginTop: "12px", marginLeft: "18px" }}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<Box as={FiSearch} size={24} ml="6px" />}
        />
        <Input
          placeholder="What do you want to listen to?"
          sx={{ width: "350px", borderRadius: "500px" }}
          _focus={{ outline: "none" }}
          focusBorderColor="gray"
          bgColor="white"
          value={searchTerm}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
            // debouncedSearch(e);
          }}
          onKeyDown={(e) => {
            // if (e.key == "Enter") {
            //   debouncedSearch.flush();
            // }
            if (e.key == "Enter") {
              searchNow(e);
            }
          }}
        />
      </InputGroup>
    </>
  );
};
export default Search;
