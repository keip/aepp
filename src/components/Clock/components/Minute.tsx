import useStyles from "../../../styles";
import Helpers from "../../../helpers";

interface MinuteProps {
  currentDate: Date;
}

const Minute = (props: MinuteProps) => {
  const classes = useStyles();

  return (
    <div
      className={classes.orbit}
      style={{
        transform: `rotate(${Helpers.scale(
          ((props.currentDate.getMinutes() +
            Helpers.scale(props.currentDate.getSeconds(), 0, 60, 0, 1)) /
            60) *
            100,
          0,
          100,
          0,
          360
        )}deg)`,
      }}
    >
      <div className={classes.minuteHand}></div>
    </div>
  );
};

export default Minute;
