// import moonImage from "../../assets/moon.png";
import useStyles from "../../styles";

interface MoonProps {}

const Moon = (props: MoonProps) => {
  //   const title = "Moon";
  const classes = useStyles();

  return (
    <div className={classes.luminary}>
      {/* <div className={classes.luminaryTitle}>{title}</div> */}
      <div
        style={{
          display: "inline-block",
          width: "1vh",
          height: "1vh",
          borderRadius: "1vh",
          background: "#6e6e6e",
          boxShadow: "0 0 1vh 1vh #ffffff75",
        }}
      ></div>
    </div>
  );
};

export default Moon;
