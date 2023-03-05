import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { SpeedOptions } from "../../types";
import Moon from "../Luminaries/Moon";
import Sun from "../Luminaries/Sun";

interface MapNavProps {
  currentDate: Date;
  setPanDisabled: Dispatch<SetStateAction<boolean>>;
  setSpeed: Dispatch<SetStateAction<SpeedOptions>>;
  speed: SpeedOptions;
  setUpdateRate: Dispatch<SetStateAction<number>>;
  updateRate: number;
}

const MapNav = (props: MapNavProps) => {
  return (
    <Paper
      elevation={0}
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        cursor: "default",
      }}
    >
      <Box
        p={3}
        onMouseEnter={() => props.setPanDisabled(true)}
        onMouseLeave={() => props.setPanDisabled(false)}
      >
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Typography variant="h5" textAlign="center">
              {moment(props.currentDate).format("DD.MM.YYYY")}
            </Typography>
            <Typography variant="h5" textAlign="center">
              {moment(props.currentDate).format("HH:mm:ss")}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Divider />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6">Speed</Typography>
            <RadioGroup
              row
              onChange={(event) =>
                props.setSpeed(event.target.value as SpeedOptions)
              }
              value={props.speed}
            >
              <FormControlLabel
                value="realtime"
                control={<Radio />}
                label="Realtime"
              />
              <FormControlLabel
                value="minute"
                control={<Radio />}
                label="1m/s"
              />
              <FormControlLabel value="hour" control={<Radio />} label="1h/s" />
              <FormControlLabel
                value="2hours"
                control={<Radio />}
                label="2h/s"
              />
              <FormControlLabel
                value="6hours"
                control={<Radio />}
                label="6h/s"
              />
              <FormControlLabel
                value="12hours"
                control={<Radio />}
                label="12h/s"
              />
              <FormControlLabel value="day" control={<Radio />} label="1d/s" />
            </RadioGroup>
          </Grid>
          <Grid item md={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">Frame rate</Typography>
              </Grid>
              <Grid item>
                <Typography align="center">
                  <b>
                    {Math.round((1000 / props.updateRate) * 10) / 10}fps (
                    {props.updateRate}
                    ms)
                  </b>
                </Typography>
              </Grid>
            </Grid>
            <Slider
              value={props.updateRate}
              step={10}
              min={40}
              max={300}
              onChange={(event, value) => props.setUpdateRate(value as number)}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5">Luminaries</Typography>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Sun />
                      </Grid>
                      <Grid item>
                        <Typography>Sun</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
              <Grid item md={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Moon />
                      </Grid>
                      <Grid item>
                        <Typography>Moon</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MapNav;
