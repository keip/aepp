import useStyles from "../../styles";

interface SunProps {}

const Sun = (props: SunProps) => {
  //   const title = "Sun";
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
          background: "#fff",
          boxShadow: "0 0 5vh 1vh #ffe711",
        }}
      ></div>
    </div>
  );
};

export default Sun;
