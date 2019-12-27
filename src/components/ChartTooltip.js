import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";
import { capFirst } from "../utils/utils";

const ChartTooltip = ({ ide, date, sunTimes }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <ReactTooltip
      id={`tooltip-${ide}`}
      type="light"
      className="tooltip-radial"
      getContent={dataTip => {
        const selected = JSON.parse(dataTip);

        if (selected) {
          return (
            <div style={{ textAlign: "center", width: "140px" }}>
              <h5
                className="bold pm hug"
                style={{ lineHeight: "1.4em", padding: "0.8em 0 0.5em 0" }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    background: selected.data.color,
                    content: " ",
                    display: "inline-block",
                    borderRadius: "50%",
                    marginRight: ".5em"
                  }}
                ></span>
                {selected.data.name}
              </h5>

              {/* Relative */}
              <p
                style={{
                  lineHeight: "1.2em",
                  paddingBottom: "0.5em"
                }}
                className="hug"
              >
                {capFirst(
                  moment(selected.from)
                    .tz(sunTimes.tz)
                    .from(moment(date).tz(sunTimes.tz))
                )}
              </p>
              {/* From → to */}
              <p style={{ lineHeight: "1.2em" }} className="hug1">
                {moment(selected.from)
                  .tz(sunTimes.tz)
                  .format("HH:mm")}{" "}
                <span className="op6">→</span>{" "}
                {moment(selected.to)
                  .tz(sunTimes.tz)
                  .format("HH:mm")}
              </p>

              {/* Duration */}
              <p
                style={{
                  lineHeight: "1.2em",
                  paddingBottom: "0.5em"
                }}
                className="hug1 "
              >
                Duration:{" "}
                <strong>{moment.duration(selected.duration).humanize()}</strong>
              </p>
            </div>
          );
        }
      }}
    />
  );
};

export default ChartTooltip;
