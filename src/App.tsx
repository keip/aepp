/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import map from "./assets/standard_map_full.png";
import Clock from "./components/Clock";
import moment from "moment";
import useStyles from "./styles";
import DoubleOrbit from "./components/DoubleOrbit";
import Sun from "./components/Luminaries/Sun";
import Moon from "./components/Luminaries/Moon";
import Mars from "./components/Luminaries/Mars";

type SpeedProps =
  | "realtime"
  | "minute"
  | "hour"
  | "2hours"
  | "6hours"
  | "12hours"
  | "day";

const App = () => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updateRate, setUpdateRate] = useState(80);
  const [zoom, setZoom] = useState(12);
  const [panDisabled, setPanDisabled] = useState(false);
  const [speed, setSpeed] = useState<SpeedProps>("realtime");
  const [panning, setPannning] = useState(false);
  const [panOrigin, setPanOrigin] = useState({ x: 0, y: 0 });
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPannning((panning) => {
        if (!panning) {
          setSpeed((speed) => {
            if (speed === "realtime") {
              setCurrentDate(new Date());
            } else if (speed === "minute") {
              setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(updateRate / 16.5, "seconds")
                  .toDate()
              );
            } else if (speed === "hour") {
              setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(updateRate / 16.5, "minutes")
                  .toDate()
              );
            } else if (speed === "2hours") {
              setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 2, "minutes")
                  .toDate()
              );
            } else if (speed === "6hours") {
              setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 6, "minutes")
                  .toDate()
              );
            } else if (speed === "12hours") {
              setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 12, "minutes")
                  .toDate()
              );
            } else if (speed === "day") {
              setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 24, "minutes")
                  .toDate()
              );
            }
            return speed;
          });
        }
        return panning;
      });
    }, updateRate);
    return () => {
      clearInterval(interval);
    };
  }, [updateRate]);

  // setPanning on mousedown
  useEffect(() => {
    const onMousedown = (event: MouseEvent) => {
      setPanOrigin({ x: event.clientX, y: event.clientY });
      setPannning(true);
    };
    const onMouseup = () => {
      setPannning(false);
    };

    addEventListener("mousedown", onMousedown);
    addEventListener("mouseup", onMouseup);

    return () => {
      removeEventListener("mousedown", onMousedown);
      removeEventListener("mouseup", onMouseup);
    };
  }, []);

  // pan on mousemove
  useEffect(() => {
    const onMousemove = (event: MouseEvent) => {
      setPanOrigin((panOrigin) => {
        const newPosition = {
          x: panOrigin.x - event.clientX + panPosition.x,
          y: panOrigin.y - event.clientY + panPosition.y,
        };
        setPanPosition(newPosition);
        return panOrigin;
      });
    };
    if (panning) {
      addEventListener("mousemove", onMousemove);
    } else {
      removeEventListener("mousemove", onMousemove);
    }

    return () => {
      removeEventListener("mousemove", onMousemove);
    };
  }, [panning]);

  // zoom on wheel
  useEffect(() => {
    let lastDeltaY = 0;
    const handleWheelEvent = (event: WheelEvent) => {
      if (lastDeltaY < event.deltaY - 1 && zoom <= 10) {
        setZoom(zoom + 0.25);
      } else if (lastDeltaY > event.deltaY + 1 && zoom > 1) {
        setZoom(zoom - 0.25);
      }
    };
    addEventListener("wheel", handleWheelEvent);
    return () => {
      removeEventListener("wheel", handleWheelEvent);
    };
  }, [zoom]);

  return (
    <Box
      overflow="hidden"
      style={{
        background: "#e9e9e9",
      }}
      px={3}
    >
      <div
        onMouseDown={() => {
          if (!panDisabled) {
            setPannning(true);
          }
        }}
        style={{
          cursor: panning ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.body}
        >
          <Grid
            item
            md={2}
            sm={12}
            sx={{ zIndex: 9, textShadow: "0 0 5px #fff" }}
          >
            <Paper
              elevation={0}
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                cursor: "default",
              }}
            >
              <Box
                p={3}
                onMouseEnter={() => setPanDisabled(true)}
                onMouseLeave={() => setPanDisabled(false)}
              >
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <Typography variant="h5" textAlign="center">
                      {moment(currentDate).format("DD.MM.YYYY")}
                    </Typography>
                    <Typography variant="h5" textAlign="center">
                      {moment(currentDate).format("HH:mm:ss")}
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
                        setSpeed(event.target.value as SpeedProps)
                      }
                      value={speed}
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
                      <FormControlLabel
                        value="hour"
                        control={<Radio />}
                        label="1h/s"
                      />
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
                      <FormControlLabel
                        value="day"
                        control={<Radio />}
                        label="1d/s"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item md={12}>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography variant="h6">Frame rate</Typography>
                      </Grid>
                      <Grid item>
                        <Typography align="center">
                          <b>
                            {Math.round((1000 / updateRate) * 10) / 10}fps (
                            {updateRate}ms)
                          </b>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Slider
                      value={updateRate}
                      step={10}
                      min={40}
                      max={300}
                      onChange={(event, value) =>
                        setUpdateRate(value as number)
                      }
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
          </Grid>
          <Grid item>
            <Box
              sx={{
                height: `100vh`,
                width: `100vh`,
                position: "relative",
                overflow: "hidden",
                transform: `scale(${zoom}) translate(${
                  -panPosition.x / zoom
                }px, ${-panPosition.y / zoom}px)`,
              }}
            >
              <img
                src={map}
                alt="Azimuthal Equidistant map"
                style={{
                  width: "100%",
                  height: "100%",
                  filter: "saturate(0) opacity(0.6)",
                }}
              />
              <DoubleOrbit
                currentDate={currentDate}
                luminary={{
                  title: "Moon",
                  r1: 0.404,
                  t1: {
                    from: moment().startOf("day").add(12, "hours").toDate(),
                    to: moment().endOf("day").add(12, "hours").toDate(),
                  },
                  r2: 0.105,
                  t2: {
                    from: moment().startOf("year").toDate(),
                    to: moment().endOf("year").toDate(),
                  },

                  orbitColor: "#ffffff",
                }}
                body={<Moon />}
              />
              <DoubleOrbit
                currentDate={currentDate}
                luminary={{
                  title: "Sun",
                  r1: 0.404,
                  t1: {
                    from: moment().startOf("day").toDate(),
                    to: moment().endOf("day").toDate(),
                  },
                  r2: 0.105,
                  t2: {
                    from: moment().startOf("year").toDate(),
                    to: moment().endOf("year").toDate(),
                  },
                  orbitColor: "#fff96b",
                }}
                body={<Sun />}
              />
              <DoubleOrbit
                currentDate={currentDate}
                luminary={{
                  title: "Mars",
                  r1: 0.2,
                  t1: {
                    from: moment().toDate(),
                    to: moment().subtract(12, "hours").toDate(),
                  },
                  r2: 0.03,
                  t2: {
                    from: moment().toDate(),
                    to: moment().add(1, "week").toDate(),
                  },
                  orbitColor: "#ff4f4f",
                }}
                body={<Mars />}
              />
              <Clock
                currentDate={currentDate}
                seconds={speed === "realtime"}
                minutes={
                  speed !== "12hours" && speed !== "6hours" && speed !== "day"
                }
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default App;
