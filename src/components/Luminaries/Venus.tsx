// import moonImage from "../../assets/moon.png";
import useStyles from "../../styles";

interface VenusProps {}

const Venus = (props: VenusProps) => {
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
          background: "#ffb14f",
          boxShadow: "0 0 1vh 0.5vh #ffb14fa1",
        }}
      ></div>
    </div>
  );
};

export default Venus;
