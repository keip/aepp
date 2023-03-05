import useStyles from "../../styles";
import { ReactNode, useEffect, useState } from "react";
import moment from "moment";
import helpers from "../../helpers";
import { Luminary } from "../../types";

interface DoubleOrbitProps {
  currentDate: Date;
  luminary: Luminary;
  body: ReactNode;
}

const DoubleOrbit = (props: DoubleOrbitProps) => {
  const currentDate = props.currentDate;
  const luminary = props.luminary;
  const classes = useStyles();
  const [r1Rotation, setR1Rotation] = useState(0);
  const [r2Rotation, setR2Rotation] = useState(0);

  useEffect(() => {
    const t1Diff = moment(luminary.t1.to).diff(luminary.t1.from);
    const t1Position = moment(currentDate).diff(luminary.t1.from);
    const newR1Rotation = helpers.scale(t1Position, 0, t1Diff, 0, 360);

    const t2Diff = moment(luminary.t2.to).diff(luminary.t2.from);
    const t2Position = moment(currentDate).diff(luminary.t2.from);
    const newR2Rotation = helpers.scale(t2Position, 0, t2Diff, 0, 360);

    setR1Rotation(newR1Rotation);
    setR2Rotation(newR2Rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <div className={classes.orbit}>
      <div
        style={{
          position: "absolute",
          transform: `rotate(${r1Rotation}deg)`,
          width: `${props.luminary.r1 * 100}vh`,
          height: `${props.luminary.r1 * 100}vh`,
          left: `${((1 - props.luminary.r1) * 100) / 2}vh`,
          top: `${((1 - props.luminary.r1) * 100) / 2}vh`,
          boxShadow: `0 0 0 0.1vh ${props.luminary.orbitColor}`,
        }}
        className={classes.orbitPath}
      >
        <div
          style={{
            position: "absolute",
            left: `${((props.luminary.r1 - props.luminary.r2) * 100) / 2}vh`,
            top: `-${(props.luminary.r2 * 100) / 2}vh`,
            transform: `rotate(${r2Rotation}deg)`,
            width: `${props.luminary.r2 * 100}vh`,
            height: `${props.luminary.r2 * 100}vh`,
            boxShadow: `0 0 0 0.1vh ${props.luminary.orbitColor}`,
          }}
          className={classes.orbitPath}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              marginTop: "-0.5vh",
            }}
          >
            {props.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleOrbit;
