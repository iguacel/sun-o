import React from "react";
import { getDistance } from "../utils/getDistance";
import usePrev from "../hooks/usePrev";

const Location = ({ sunTimes, location }) => {
  // PrevLocation
  const prevLocation = usePrev(location);

  // Distancia
  const distance = prevLocation && getDistance(location, prevLocation);

  // Render
  return (
    <div
      style={{
        width: "100%",
        padding: "1em"
      }}
      className="dayWrapper center"
    >
      <p
        className="pm hug"
        style={{
          fontSize: "90%",
          lineHeight: "1.4em"
        }}
      >
        <span
          style={{
            fontSize: "95%",
            textTransform: "uppercase",
            letterSpacing: "0.07em"
          }}
        >
          {sunTimes && sunTimes.tz && sunTimes.tz.split("/")[0]}
        </span>
        <span style={{ color: "RGBA(233, 233, 234, 1.00)" }}> {" | "}</span>

        <strong>
          {sunTimes &&
            sunTimes.tz &&
            sunTimes.tz.split("/")[1].replace("_", " ")}
        </strong>
      </p>

      <h5 className="pm small">
        {distance && distance !== 0
          ? "Distance traveled: " + distance.toLocaleString() + " km"
          : "Click on the map"}
      </h5>
    </div>
  );
};

export default Location;
