import React from "react";
import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

const Clock = ({ date, sunTimes, radar }) => {
  return (
    <div className="center">
      {/* Fecha */}
      <p className="hug1 small">
        {date.tz(sunTimes.tz).format("dddd")}
        <br />
        <span className="bold">{date.tz(sunTimes.tz).format("MMM Do YY")}</span>
      </p>

      {/* Clock */}
      <h4
        className="xlarge hug"
        style={{
          display: "inline-block",
          fontWeight: 600,
          padding: "0 0.5em 0 0.5em"
        }}
      >
        {
          moment(date)
            .tz(sunTimes.tz)
            .format("HH")
            .split("/")[0]
        }
        <span className="timeDots">:</span>
        {
          moment(date)
            .tz(sunTimes.tz)
            .format("mm")
            .split("/")[0]
        }
      </h4>
      {/* CurrentPhase */}
      <p
        className="hug bold"
        style={{
          color: sunTimes.currentPhase.data.bg,
          paddingBottom: ".5em",
          margin: "0 auto",
          maxWidth: radar && "150px",
          height: radar && "50px"
        }}
      >
        {sunTimes.currentPhase.data.name}
      </p>
    </div>
  );
};

export default Clock;
