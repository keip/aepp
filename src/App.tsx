import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import { DoubleOrbitSettings, SpeedOptions, ViewOptions } from "./types";
import MapNav from "./components/MapNav";
import Map from "./components/Map";
import moment from "moment";

const App = () => {
  const classes = useStyles();
  const [view, setView] = useState<ViewOptions>('color');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updateRate, setUpdateRate] = useState(1000);
  const [panning, setPanning] = useState(false);
  const [panDisabled, setPanDisabled] = useState(false);
  const [speed, setSpeed] = useState<SpeedOptions>("realtime");
  const [luminaries, setLuminaries] = useState<DoubleOrbitSettings[]>([
    {
      title: "Sun",
      color: "#fff96b",
      size: 1,
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
    },
    {
      title: "Moon",
      color: "#ffffff",
      size: 1,
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
      hide: true,
    },
    {
      title: "Venus",
      color: "#ffb14f",
      size: 0.5,
      r1: 0.384,
      t1: {
        from: moment().startOf("day").toDate(),
        to: moment().endOf("day").toDate(),
      },
      r2: 0.2,
      t2: {
        from: moment('20170325', 'YYYYMMDD').toDate(),
        to: moment('20170325', 'YYYYMMDD').add(224.8, "days").toDate(),
      },
    },
    {
      title: "Mars",
      color: "#ff4f4f",
      size: 0.5,
      r1: 0.424,
      t1: {
        from: moment().startOf("day").toDate(),
        to: moment().endOf("day").toDate(),
      },
      r2: 0.3,
      t2: {
        from: moment('20211007').toDate(),
        to: moment('20211007').add(686.93, "days").toDate(),
      },
    },
  ]);

  return (
    <Box overflow="hidden" px={3} className={classes.wrapper}>
      <div
        onMouseDown={() => {
          if (!panDisabled) {
            setPanning(true);
          }
        }}
        style={{
          cursor: panning ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={2} sm={12} className={classes.body}>
            <MapNav
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              speed={speed}
              setSpeed={setSpeed}
              setPanDisabled={setPanDisabled}
              setUpdateRate={setUpdateRate}
              updateRate={updateRate}
              luminaries={luminaries}
              setLuminaries={setLuminaries}
              view={view}
              setView={setView}
            />
          </Grid>
          <Grid item>
            <Map
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              setPanning={setPanning}
              panning={panning}
              setSpeed={setSpeed}
              speed={speed}
              updateRate={updateRate}
              luminaries={luminaries}
              setLuminaries={setLuminaries}
              view={view}
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default App;
