import useStyles from "../../styles";
import { useEffect, useState } from "react";
import moment from "moment";
import helpers from "../../helpers";
import { DoubleOrbitSettings } from "../../types";

interface DoubleOrbitProps {
  currentDate: Date;
  settings: DoubleOrbitSettings;
}

const DoubleOrbit = (props: DoubleOrbitProps) => {
  const currentDate = props.currentDate;
  const settings = props.settings;
  const classes = useStyles();
  const [r1Rotation, setR1Rotation] = useState(0);
  const [r2Rotation, setR2Rotation] = useState(0);

  useEffect(() => {
    const t1Diff = moment(settings.t1.to).diff(settings.t1.from);
    const t1Position = moment(currentDate).diff(settings.t1.from);
    const newR1Rotation = helpers.scale(t1Position, 0, t1Diff, 0, 360);

    const t2Diff = moment(settings.t2.to).diff(settings.t2.from);
    const t2Position = moment(currentDate).diff(settings.t2.from);
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
          width: `${settings.r1 * 100}vh`,
          height: `${settings.r1 * 100}vh`,
          left: `${((1 - settings.r1) * 100) / 2}vh`,
          top: `${((1 - settings.r1) * 100) / 2}vh`,
          boxShadow: `0 0 0 0.1vh ${settings.color}`,
        }}
        className={classes.orbitPath}
      >
        <div
          style={{
            position: "absolute",
            left: `${((settings.r1 - settings.r2) * 100) / 2}vh`,
            top: `-${(settings.r2 * 100) / 2}vh`,
            transform: `rotate(${r2Rotation}deg)`,
            width: `${settings.r2 * 100}vh`,
            height: `${settings.r2 * 100}vh`,
            boxShadow: `0 0 0 0.1vh ${settings.color}`,
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
            {settings.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleOrbit;
