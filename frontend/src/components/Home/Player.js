import {
  Box,
  Button,
  Icon,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Youtube from "react-youtube";
import debounce from "lodash/debounce";
import "./Player.css";
import { BsPlayFill } from "react-icons/bs";
import { IoMdPause } from "react-icons/io";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../../store/player";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { ImShuffle } from "react-icons/im";
import { TbRepeat } from "react-icons/tb";
import MyTooltip from "./MyTooltip";

const Player = ({ playerTarget, setPlayerTarget }) => {
  //   const [currentVideo, setCurrentVideo] = useState("i1nindf1meE");
  //   const [currentVideo, setCurrentVideo] = useState("DK_0jXPuIr0");
  //   const [currentVideo, setCurrentVideo] = useState("DcDbKDAb7go");
  //   const [currentVideo, setCurrentVideo] = useState("bsgBUM2Mnsw");
  // changmo
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) => state.player.song);
  //   console.log(currentVideo, "this is currVideo");

  useEffect(() => {
    console.log("rerender");
    dispatch(setCurrentSong("i1nindf1meE"));
  }, [dispatch]);
  //   const [currentVideo, setCurrentVideo] = useState("AuVMFXOjsNU");
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(-1);
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const delaySeek = useCallback(
    debounce((val) => {
      // playerTarget.mute();
    }, 0)
  );
  const opts = {
    height: "390",
    width: "640",
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    // },
  };
  //   console.log(playerTarget, "thsi is pLAYER TARGET");
  let iframeWindow;

  var lastTimeUpdate = 0;
  function currTimeListener(event) {
    if (event.source === iframeWindow) {
      var e = JSON.parse(event.data);

      if (e.event === "infoDelivery" && e.info && e.info.currentTime) {
        var time = Math.floor(e.info.currentTime);

        if (time !== lastTimeUpdate) {
          lastTimeUpdate = time;
          //   console.log(time);
          setCurrentTime(time);
        }
        console.log(playerTarget.getPlayerState(), "this is state info");
        setCurrentStatus(playerTarget.getPlayerState());

        if (playerTarget.getPlayerState() === 0) {
          // when video ends set to 0
          setCurrentStatus(-1);
          setCurrentTime(0);
        }
      }
    }
  }
  //   if (playerTarget) console.log(playerTarget.getPlayerState(), "player state");
  useEffect(() => {
    iframeWindow =
      playerTarget &&
      playerTarget.getIframe() &&
      playerTarget.getIframe().contentWindow;
    window.addEventListener("message", currTimeListener);

    return () => {
      window.removeEventListener("message", currTimeListener);
    };
  }, [playerTarget]);

  useEffect(() => {
    if (currentVideo !== "") {
      setLoading(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAJ2XLMnSvimbXpCBpUnoKr4RKZr4VwlGY&part=snippet&id=${currentVideo}`
      )
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data, "this is data");
          setVideoDetails(data.items[0].snippet);
          setCurrentStatus(-1);
        });
    }
  }, [currentVideo]);
  //   console.log(videoDetails, " THIS IS SNIPPETT");
  //   console.log(currentTime, "current time", "/", maxTime, "maxTime");
  //   console.log(currentTime / maxTime);
  //   console.log(currentStatus, "this is curr status");
  if (videoDetails) {
    // console.log(videoDetails.channelTitle);
    // console.log(videoDetails.title.includes("VEVO"));
    //   ? videoDetails.title.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    //   : videoDetails.title)
  }

  return (
    <>
      <Youtube
        // videoId="i1nindf1meE"
        videoId={currentVideo}
        iframeClassName="reactplayer"
        style={{ width: "0px", height: "0px" }}
        opts={opts}
        onReady={(e) => {
          //   console.log(e, "this is e");
          //   console.log("READY TO PLAY");
          setLoading(false);
          setPlayerTarget(e.target);
          setCurrentTime(e.target.getCurrentTime());
          setMaxTime(e.target.getDuration());
        }}
      />
      <div className="player-wrapper">
        {/* player starts */}
        <Box className="detailsFlexPortion">
          {/* get youtube info, title, artist, and cover picture */}
          <Box className="detailsContainer">
            <Image
              boxSize="56px"
              src={videoDetails && videoDetails.thumbnails.default.url}
            ></Image>
            <Box style={{ margin: "0 14px" }}>
              {/* middle portion */}
              <Text color="white" fontSize="14.5px">
                {videoDetails &&
                  videoDetails.title.replace(
                    videoDetails.channelTitle
                      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                      .replace("VEVO", "") + "- ",
                    ""
                  )}
              </Text>
              <Text fontWeight={300} fontSize="12px" color="white">
                {videoDetails &&
                  (videoDetails.channelTitle.includes("VEVO")
                    ? videoDetails.channelTitle
                        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
                        .replace("VEVO", "")
                    : videoDetails.channelTitle)}
              </Text>
            </Box>

            {/* heart icon & add to playlist */}

            <MyTooltip text="Like this Song">
              <Box>
                <Icon
                  fontSize={22}
                  color="rgb(186,186,186)"
                  as={AiOutlineHeart}
                  _active={{
                    color: "white",
                    transform: "scale(1.1)",
                    animation: "shake 0.5s",
                    animationIterationCount: "infinite",
                  }}
                  _hover={{
                    color: "white",
                    cursor: "pointer",
                  }}
                ></Icon>
              </Box>
            </MyTooltip>

            <MyTooltip text="Add to Playlist">
              <Box>
                <Icon
                  ml="7px"
                  fontSize={22}
                  color="rgb(186,186,186)"
                  as={AiOutlinePlus}
                  _active={{
                    color: "white",
                    transform: "scale(1.1)",
                    animation: "shake 0.5s",
                    animationIterationCount: "infinite",
                  }}
                  _hover={{
                    color: "white",
                    cursor: "pointer",
                  }}
                ></Icon>
              </Box>
            </MyTooltip>
          </Box>
        </Box>
        <Box className="playerFlexPortion">
          <Box className="tophalfplayer">
            {/* top half */}
            <ImShuffle
              style={{ width: "18px", height: "20px" }}
              preserveAspectRatio="none"
              color="rgb(186, 186, 186)"
            />
            <FaStepBackward
              style={{ width: "23px", height: "18px" }}
              preserveAspectRatio="none"
              color="rgb(186, 186, 186)"
            />
            {(playerTarget && currentStatus === 2) || currentStatus === -1 ? (
              <>
                <Button
                  onClick={() => {
                    console.log(playerTarget, "this is playerTarget");
                    playerTarget.playVideo();
                  }}
                  sx={{
                    borderRadius: "32px",
                    width: "32px",
                    // padding: "0",
                  }}
                  _active={{
                    //   transform: "translateY(1px)",
                    transform: "scale(1.05) translateY(3px)",
                  }}
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                >
                  <Box pl="2px">
                    {loading ? (
                      <Spinner
                        sx={{
                          position: "absolute",
                          bottom: "8px",
                          left: "8px",
                        }}
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="green.500"
                        size="md"
                      />
                    ) : (
                      <BsPlayFill size={28} sx={{ margin: "auto" }} />
                    )}
                  </Box>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  console.log(playerTarget, "this is playerTarget");
                  playerTarget.pauseVideo();
                }}
                sx={{ borderRadius: "32px", width: "32px", padding: "0" }}
                _active={{
                  //   transform: "translateY(1px)",
                  transform: "scale(1.05)  translateY(3px)",
                }}
              >
                <Box>
                  <IoMdPause size={20} />
                </Box>
              </Button>
            )}
            <FaStepForward
              style={{ width: "23px", height: "18px" }}
              preserveAspectRatio="none"
              color="rgb(186, 186, 186)"
            />
            <TbRepeat
              style={{ width: "20px", height: "20px" }}
              preserveAspectRatio="none"
              color="rgb(186, 186, 186)"
            />
          </Box>
          <Box className="bottomhalfplayer">
            {playerTarget ? (
              <>
                <div className="coreplayer" style={{ color: "white" }}>
                  <div
                    className="noselect"
                    style={{
                      marginRight: "10px",
                      fontSize: "12px",
                      paddingTop: "1px",
                    }}
                  >
                    {new Date(currentTime * 1000)
                      .toISOString()
                      .substring(14, 19)}
                  </div>
                  <Slider
                    aria-label="slider-ex-1"
                    //   value={(currentTime / maxTime) * 100}
                    value={currentTime}
                    min={0}
                    max={maxTime}
                    focusThumbOnChange={false}
                    onChange={
                      (val) => {
                        //   playerTarget.mute();
                        //   delaySeek(e);
                        playerTarget.seekTo(val);
                        playerTarget.unMute();
                      }
                      //   (val) => {
                      //   playerTarget.mute();
                      //   playerTarget.seekTo((val / 100) * maxTime);
                      //   playerTarget.unMute();
                      // }
                    }
                    step={0.5}
                  >
                    <SliderTrack
                      _hover={{
                        boxSize: 1,
                      }}
                    >
                      <SliderFilledTrack
                        sx={{ backgroundColor: "rgb(29, 185, 84)" }}
                      />
                    </SliderTrack>
                    <SliderThumb
                      boxSize={1}
                      _active={{
                        boxSize: 3,
                      }}
                      _hover={{
                        boxSize: 3,
                      }}
                    />
                  </Slider>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontSize: "12px",
                      paddingTop: "1px",
                    }}
                    className="noselect"
                  >
                    {new Date(maxTime * 1000).toISOString().substring(14, 19)}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="coreplayer" style={{ color: "white" }}>
                  <div
                    className="noselect"
                    style={{
                      marginRight: "15px",
                      fontSize: "10px",
                      paddingTop: "1px",
                    }}
                  >
                    {/* {new Date(0 * 1000).toISOString().substring(14, 19)} */}
                    -:-
                  </div>
                  <Slider
                    aria-label="slider-ex-1"
                    //   value={(currentTime / maxTime) * 100}
                    value={currentTime}
                    min={0}
                    max={maxTime}
                    focusThumbOnChange={false}
                    onChange={
                      (val) => {
                        //   playerTarget.mute();
                        //   delaySeek(e);
                        playerTarget.seekTo(val);
                        playerTarget.unMute();
                      }
                      //   (val) => {
                      //   playerTarget.mute();
                      //   playerTarget.seekTo((val / 100) * maxTime);
                      //   playerTarget.unMute();
                      // }
                    }
                    step={1}
                  >
                    <SliderTrack
                      _hover={{
                        boxSize: 1,
                      }}
                    >
                      <SliderFilledTrack sx={{ backgroundColor: "white" }} />
                    </SliderTrack>
                    <SliderThumb
                      boxSize={1}
                      _active={{
                        boxSize: 3,
                      }}
                      _hover={{
                        boxSize: 3,
                      }}
                    />
                  </Slider>
                  <div
                    style={{
                      marginLeft: "15px",
                      fontSize: "10px",
                      paddingTop: "1px",
                    }}
                    className="noselect"
                  >
                    {/* {new Date(0 * 1000).toISOString().substring(14, 19)} */}
                    -:-
                  </div>
                </div>
              </>
            )}
          </Box>
        </Box>
        <Box className="volumeFlexPortion"></Box>
        {/* player ends */}
      </div>
    </>
  );
};
export default Player;
