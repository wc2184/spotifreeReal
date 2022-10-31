# Spotifree

[Spotifree Live Link](https://spotifreeaa22.herokuapp.com/)

## Brief Overview

Spotifree is clone of Spotify and has the functionality for searching any song, playing the music of any song, and creating playlists without functionality for now. In the future, users will be able to like a song and add any song to playlists to save for later.

## Technologies Used

- Ruby
- Ruby on Rails
- JavaScript
- React
- Redux
- Heroku
- Youtube Data API V3
- Youtube iFrame
- Chakra UI

## Two Features are Playing Music and Search

- Able to search up any song

```Js
// Home/Search.js
const searchNow = () => {
    dispatch(searchYoutube(searchTerm)).then(() => {
      setTimeout(() => {
        // setSubmitted(true);
      }, 200);
      window.scrollTo(0, 0);
    });
  };

// store/search.js
export const searchYoutube = (text) => async (dispatch) => {
  console.log("fetched once");
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAJ2XLMnSvimbXpCBpUnoKr4RKZr4VwlGY&q=${
      text + " audio"
    }&type=video&part=snippet&videoCategoryId=10&order=relevance&maxResults=20`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data2 = await response.clone();
  const data = await response.json();

  dispatch(setSearchResults(data));
  return data2;
};

```

- Search bar that calls the redux thunk to search and populate songs regarding user's input

```Js
    const searchNow = () => {
      console.log(searchTerm, "this is searchTerm");
      dispatch(searchYoutube(searchTerm)).then(() => {

        window.scrollTo(0, 0);
      });
  };

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
          className="searchbartarget"
          placeholder="What do you want to listen to?"
          sx={{ width: "350px", borderRadius: "500px" }}
          _focus={{ outline: "none" }}
          focusBorderColor="gray"
          bgColor="white"
          value={searchTerm}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
          onKeyDown={(e) => {

            if (e.key == "Enter") {
              searchNow(e);
            }
          }}
        />
      </InputGroup>
    </>
  );
```

## Challenges I have faced and is facing

- Code is immensely long and some files needs to be refactored.
- Otherwise, it's smooth sailing

## Future Implements

- Make playlists be functional
- Able to edit playlists
- Able to like songs
- Make the Home and My Library screen more pretty and useful.
