import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import { SpeedOptions } from "./types";
import MapNav from "./components/MapNav";
import Map from "./components/Map";

const App = () => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [updateRate, setUpdateRate] = useState(80);
  const [panning, setPanning] = useState(false);
  const [panDisabled, setPanDisabled] = useState(false);
  const [speed, setSpeed] = useState<SpeedOptions>("realtime");

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
              speed={speed}
              setSpeed={setSpeed}
              setPanDisabled={setPanDisabled}
              setUpdateRate={setUpdateRate}
              updateRate={updateRate}
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
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default App;
