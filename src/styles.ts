import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  body: {
    // background: "#0972bb",
  },
  orbit: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  orbitPath: {
    borderRadius: "100%",
  },
  luminary: {
    display: "inline-flex",
  },
  luminaryTitle: {
    position: "absolute",
    left: "1vh",
    fontSize: "2vh",
  },
  northPole: {
    position: "absolute",
    top: "calc(50% - 1vh)",
    left: "calc(50% - 1vh)",
    width: "2vh",
    height: "2vh",
    borderRadius: 30,
    background: "#000",
  },
  hourHand: {
    width: "0.8vh",
    height: "25vh",
    marginTop: "25vh",
    background: "#222",
    marginLeft: "calc(50% - 0.4vh)",
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: "100% 100% 0 0",
    position: "relative",
    zIndex: 9,
  },
  minuteHand: {
    width: "0.6vh",
    height: "30vh",
    marginTop: "20vh",
    background: "#222",
    marginLeft: "calc(50% - 0.3vh)",
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: "100% 100% 0 0",
  },
  secondHand: {
    width: "0.3vh",
    height: "35vh",
    marginTop: "15vh",
    background: "#222",
    marginLeft: "calc(50% - 0.15vh)",
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: "100% 100% 0 0",
  },
});

export default useStyles;
