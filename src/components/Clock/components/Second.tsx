import useStyles from "../../../styles";
import Helpers from "../../../helpers";

interface SecondProps {
  currentDate: Date;
}

const Second = (props: SecondProps) => {
  const classes = useStyles();
  return (
    <div
      className={classes.orbit}
      style={{
        transform: `rotate(${Helpers.scale(
          ((props.currentDate.getSeconds() +
            Helpers.scale(props.currentDate.getMilliseconds(), 0, 1000, 0, 1)) /
            60) *
            100,
          0,
          100,
          0,
          360
        )}deg)`,
      }}
    >
      <div className={classes.secondHand}></div>
    </div>
  );
};

export default Second;
