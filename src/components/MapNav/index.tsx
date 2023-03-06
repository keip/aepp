import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import { DoubleOrbitSettings, SpeedOptions, ViewOptions } from "../../types";
import Luminary from "../Luminary";

interface MapNavProps {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setPanDisabled: Dispatch<SetStateAction<boolean>>;
  setSpeed: Dispatch<SetStateAction<SpeedOptions>>;
  speed: SpeedOptions;
  setUpdateRate: Dispatch<SetStateAction<number>>;
  updateRate: number;
  luminaries: DoubleOrbitSettings[];
  setLuminaries: Dispatch<SetStateAction<DoubleOrbitSettings[]>>;
  view: ViewOptions;
  setView: Dispatch<SetStateAction<ViewOptions>>;
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
            <Typography variant="h6">View</Typography>
            <RadioGroup
              row
              onChange={(event) =>
                props.setView(event.target.value as ViewOptions)
              }
              value={props.view}
            >
              <FormControlLabel
                value="xray"
                control={<Radio />}
                label="X-ray"
              />
              <FormControlLabel
                value="color"
                control={<Radio />}
                label="Color"
              />
              <FormControlLabel
                value="constellations"
                control={<Radio />}
                label="Constellations"
              />
            </RadioGroup>
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
            <Typography variant="h5">Luminaries</Typography>
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={1}>
              {props.luminaries.map((luminary, key) => (
                <Grid item md={12} key={`luminary-hide-${key}`}>
                  <FormControlLabel
                    control={<Checkbox checked={!luminary.hide} onChange={() => {
                      props.setLuminaries(
                        props.luminaries.map(
                          (l, k) => key === k ? {...l, hide: !luminary.hide} : l
                        )
                      );
                    }} />}
                    label={
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Luminary size={luminary.size} color={luminary.color} />
                        </Grid>
                        <Grid item>
                          <Typography>{luminary.title}</Typography>
                        </Grid>
                      </Grid>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MapNav;
