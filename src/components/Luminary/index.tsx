
import useStyles from "../../styles";

export type LuminaryProps = {
  size: number;
  color: string;
}

const Luminary = (props: LuminaryProps) => {
  const classes = useStyles();

  return (
    <div className={classes.luminary}>
      <div
        style={{
          display: "inline-block",
          width: `${props.size}vh`,
          height: `${props.size}vh`,
          borderRadius: 30,
          background: `${props.color}`,
          boxShadow: `0 0 1vh 0.5vh ${props.color}a1`,
        }}
      ></div>
    </div>
  );
};

export default Luminary;
