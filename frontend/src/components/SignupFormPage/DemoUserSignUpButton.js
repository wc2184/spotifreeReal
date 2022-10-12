import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";

const DemoUserSignUpButton = ({ style }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ ...style, textAlign: "center" }}>
        <Button
          onClick={() => {
            console.log("demo ");
            let rand = Math.random().toString(36).substring(2, 12);
            dispatch(
              signup({
                email: rand + "@gmail.com",
                username: "Recruiter-" + rand,
                password: "12341234",
              })
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "dataaa");
              });
          }}
          sx={{
            borderRadius: "500px",
            height: "56px",
            width: "194px",
            fontFamily: "Circular",
            fontWeight: "900",
            fontSize: "17px",
            backgroundColor: "#1ed760",
          }}
          _hover={{
            transform: "scale(1.05)",
            backgroundColor: "#1ed760",
            filter: "brightness(0.95)",
          }}
          _active={{
            filter: "brightness(0.75)",
          }}
        >
          Demo User Sign Up
        </Button>
      </div>
    </>
  );
};
export default DemoUserSignUpButton;
