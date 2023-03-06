/* eslint-disable no-restricted-globals */
import Box from "@mui/material/Box";
import moment from "moment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Clock from "../Clock";
import DoubleOrbit from "../DoubleOrbit";
import mapImage from "../../assets/standard_map_full.png";
import mapColorImage from "../../assets/azimutal-equidistant-color.png";
import constellationsImage from '../../assets/azimutal-equidistant-constellations.png';
import { DoubleOrbitSettings, SpeedOptions, ViewOptions } from "../../types";

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
  view: ViewOptions;
}

const Map = (props: MapProps) => {
  const panning = props.panning;
  const updateRate = props.updateRate;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [panOrigin, setPanOrigin] = useState({ x: 0, y: 0 });
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const interval = setInterval(() => {
      props.setPanning((panning) => {
        if (!panning && props.speed !== 'custom') {
          props.setSpeed((speed) => {
            if (speed === "realtime") {
              props.setCurrentDate(new Date());
            } else if (speed === "minute") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(1, "minute")
                  .toDate()
              );
            } else if (speed === "hour") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(1, "hour")
                  .toDate()
              );
            } else if (speed === "2hours") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(2, "hours")
                  .toDate()
              );
            } else if (speed === "6hours") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(6, "hours")
                  .toDate()
              );
            } else if (speed === "12hours") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(12, "hours")
                  .toDate()
              );
            } else if (speed === "day") {
              props.setCurrentDate((currentDate) =>
                moment(currentDate)
                  .add(1, "day")
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
        transition: 'transform 0.1s'
      }}
    >
      {props.view === 'xray' && (
        <img
          src={mapImage}
          alt="Azimuthal Equidistant map"
          style={{
            width: "100%",
            height: "100%",
            filter: "saturate(0) opacity(0.8) invert(1)",
          }}
        />
      )}
      {props.view === 'color' && (
        <img
          src={mapColorImage}
          alt="Azimuthal Equidistant map"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
      {props.view === 'constellations' && (
        <img
          src={constellationsImage}
          alt="Azimuthal Equidistant constellations map"
          style={{
            width: "100%",
            height: "100%",
            filter: "saturate(0) opacity(0.6)",
          }}
        />
      )}
      <Clock
        currentDate={props.currentDate}
        seconds={props.speed === "realtime"}
        minutes={
          props.speed !== "12hours" &&
          props.speed !== "6hours" &&
          props.speed !== "day"
        }
      />
      {props.luminaries.map((luminarySettings, key) => luminarySettings.hide ? null : (
        <DoubleOrbit currentDate={props.currentDate} settings={luminarySettings} key={`luminary-${key}`} />
      ))}
    </Box>
  );
};

export default Map;
