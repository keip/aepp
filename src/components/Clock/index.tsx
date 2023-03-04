import { Box } from "@mui/material";
import useStyles from "../../styles";
import Hour from "./components/Hour";
import Minute from "./components/Minute";
import Second from "./components/Second";

interface ClockProps {
  currentDate: Date;
  seconds?: boolean;
  minutes?: boolean;
}

const Clock = (props: ClockProps) => {
  const classes = useStyles();

  return (
    <Box>
      {props.seconds && <Second currentDate={props.currentDate} />}
      {props.minutes && <Minute currentDate={props.currentDate} />}
      <Hour currentDate={props.currentDate} />
      <div className={classes.northPole}></div>
    </Box>
  );
};

export default Clock;
