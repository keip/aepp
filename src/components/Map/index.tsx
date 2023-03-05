/* eslint-disable no-restricted-globals */
import Box from "@mui/material/Box";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Clock from "../Clock";
import DoubleOrbit from "../DoubleOrbit";
import mapImage from "../../assets/standard_map_full.png";
// import constellationsImage from '../../assets/azimutal-equidistant-constellations.png';
import { DoubleOrbitSettings, SpeedOptions } from "../../types";

interface MapProps {
  setLuminaries: Dispatch<SetStateAction<DoubleOrbitSettings[]>>;
  luminaries: DoubleOrbitSettings[];
  setSpeed: Dispatch<SetStateAction<SpeedOptions>>;
  speed: SpeedOptions;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  currentDate: Date;
  setPanning: Dispatch<SetStateAction<boolean>>;
  panning: boolean;
  updateRate: number;
}

const Map = (props: MapProps) => {
  const panning = props.panning;
  const updateRate = props.updateRate;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [panOrigin, setPanOrigin] = useState({ x: 0, y: 0 });
  const [panPosition, setPanPosition] = useState({ x: 180, y: 0 });
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const interval = setInterval(() => {
      props.setPanning((panning) => {
        if (!panning) {
          props.setSpeed((speed) => {
            if (speed === "realtime") {
              props.setCurrentDate(new Date());
            } else if (speed === "minute") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(updateRate / 16.5, "seconds")
                  .toDate()
              );
            } else if (speed === "hour") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(updateRate / 16.5, "minutes")
                  .toDate()
              );
            } else if (speed === "2hours") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 2, "minutes")
                  .toDate()
              );
            } else if (speed === "6hours") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 6, "minutes")
                  .toDate()
              );
            } else if (speed === "12hours") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add((updateRate / 16.5) * 12, "minutes")
                  .toDate()
              );
            } else if (speed === "day") {
              props.setCurrentDate((currentDate) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRate]);

  // setPanning on mousedown
  useEffect(() => {
    const onMousedown = (event: MouseEvent) => {
      setPanOrigin({ x: event.clientX, y: event.clientY });
      props.setPanning(true);
    };
    const onMouseup = () => {
      props.setPanning(false);
    };

    addEventListener("mousedown", onMousedown);
    addEventListener("mouseup", onMouseup);

    return () => {
      removeEventListener("mousedown", onMousedown);
      removeEventListener("mouseup", onMouseup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      sx={{
        height: `100vh`,
        width: `100vh`,
        position: "relative",
        overflow: "hidden",
        transform: `scale(${zoom}) translate(${-panPosition.x / zoom}px, ${
          -panPosition.y / zoom
        }px)`,
      }}
    >
      <img
        src={mapImage}
        alt="Azimuthal Equidistant map"
        style={{
          width: "100%",
          height: "100%",
          filter: "saturate(0) opacity(0.6)",
        }}
      />
      {/* <img
        src={constellationsImage}
        alt="Azimuthal Equidistant constellations map"
        style={{
          width: "100%",
          height: "100%",
          filter: "saturate(0) opacity(0.6)",
        }}
      /> */}
      {props.luminaries.map((luminarySettings, key) => luminarySettings.hide ? null : (
        <DoubleOrbit currentDate={props.currentDate} settings={luminarySettings} key={`luminary-${key}`} />
      ))}
      <Clock
        currentDate={props.currentDate}
        seconds={props.speed === "realtime"}
        minutes={
          props.speed !== "12hours" &&
          props.speed !== "6hours" &&
          props.speed !== "day"
        }
      />
    </Box>
  );
};

export default Map;
