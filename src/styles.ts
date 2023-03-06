import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
    background: "#141414",
    position: "fixed",
  },
  body: {
    zIndex: 9,
    textShadow: "0 0 5px #fff",
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
    top: "calc(50% - 0.6vh)",
    left: "calc(50% - 0.6vh)",
    width: "1.2vh",
    height: "1.2vh",
    borderRadius: 30,
    background: "#ccc",
  },
  hourHand: {
    width: "0.8vh",
    height: "20.2vh",
    marginTop: "29.8vh",
    background: "#ccc",
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
    background: "#ccc",
    marginLeft: "calc(50% - 0.3vh)",
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: "100% 100% 0 0",
  },
  secondHand: {
    width: "0.3vh",
    height: "35vh",
    marginTop: "15vh",
    background: "#ccc",
    marginLeft: "calc(50% - 0.15vh)",
    boxShadow: "0 0 10px rgb(0 0 0 / 30%)",
    borderRadius: "100% 100% 0 0",
  },
});

export default useStyles;
