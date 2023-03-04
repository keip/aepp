// import moonImage from "../../assets/moon.png";
import useStyles from "../../styles";

interface MarsProps {}

const Mars = (props: MarsProps) => {
  //   const title = "Mars";
  const classes = useStyles();

  return (
    <div className={classes.luminary}>
      {/* <div className={classes.luminaryTitle}>{title}</div> */}
      <div
        style={{
          display: "inline-block",
          width: "1vh",
          height: "1vh",
          borderRadius: 30,
          background: "#ff4f4f",
          boxShadow: "0 0 1vh 0.5vh #ff4f4fa1",
        }}
      ></div>
    </div>
  );
};

export default Mars;
