const initialState = {
  search: "",
  searchResults: { items: [] },
};
const SET_SEARCH = "search/setSearch";
const SET_SEARCH_RESULTS = "search/setSearchResults";

export const setSearch = (text) => {
  return {
    type: SET_SEARCH,
    text: text,
  };
};
export const setSearchResults = (data) => {
  return {
    type: SET_SEARCH_RESULTS,
    data: data,
  };
};

export const searchYoutube = (text) => async (dispatch) => {
  console.log("fetched once");
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAJ2XLMnSvimbXpCBpUnoKr4RKZr4VwlGY&q=${text}&type=video&part=snippet&videoCategoryId=10&order=viewCount`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data2 = await response.clone();
  const data = await response.json();

  //   storeCurrentUser(data.user);
  dispatch(setSearchResults(data));
  return data2;
};

export default function searchReducer(state = initialState, action) {
  // const nextState = { ...state };

  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.text };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.data };
    default:
      return state;
  }
}
