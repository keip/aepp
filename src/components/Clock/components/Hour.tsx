import useStyles from "../../../styles";
import Helpers from "../../../helpers";

interface HourProps {
  currentDate: Date;
}

const Hour = (props: HourProps) => {
  const classes = useStyles();

  return (
    <div
      className={classes.orbit}
      style={{
        transform: `rotate(${Helpers.scale(
          ((props.currentDate.getHours() +
            Helpers.scale(props.currentDate.getMinutes(), 0, 60, 0, 1)) /
            24) *
            100,
          0,
          100,
          0,
          360
        )}deg)`,
      }}
    >
      <div className={classes.hourHand}></div>
    </div>
  );
};

export default Hour;
