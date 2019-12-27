import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";

const MapTooltip = ({ ide, mousePosition, date }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    mousePosition &&
    mousePosition.x && (
      <ReactTooltip
        id={`tooltip-${ide}`}
        type="light"
        className="tooltip-radial"
        getContent={dataTip => {
          return (
            <div
              style={{
                textAlign: "center",
                width: "120px",
                userSelect: "none"
              }}
            >
              <p className="hug2">
                <span
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.07em"
                  }}
                >
                  {mousePosition &&
                    mousePosition.tz &&
                    mousePosition.tz.split("/")[0]}
                </span>
                <br />
                <span className="hug bold">
                  {mousePosition &&
                    mousePosition.tz &&
                    mousePosition.tz.split("/")[1].replace("_", " ")}
                </span>
              </p>
              <br />

              <h4 className="xlarge hug pm" style={{ fontWeight: 600 }}>
                {mousePosition &&
                  mousePosition.tz &&
                  date
                    .tz(mousePosition.tz)
                    .format("HH")
                    .split("/")[0]}

                <span className="timeDots">:</span>

                {mousePosition &&
                  mousePosition.tz &&
                  date
                    .tz(mousePosition.tz)
                    .format("mm")
                    .split("/")[0]}
              </h4>

              <p className="pm hug" style={{ padding: 0, margin: 0 }}>
                {mousePosition &&
                  mousePosition.tz &&
                  date.tz(mousePosition.tz).format("MMM Do")}
              </p>
              <br />

              <p
                style={{
                  borderBottom: "1px solid RGBA(205, 206, 207, 1.00)",
                  textAlign: "left"
                }}
                className="pm"
              >
                <strong
                  style={{
                    display: "inline-block",
                    width: "42px"
                  }}
                >
                  Lat:{" "}
                </strong>
                {mousePosition.lat}
              </p>
              <p
                style={{
                  paddingBottom: "0.2em",
                  textAlign: "left"
                }}
                className="pm hug2"
              >
                <strong
                  style={{
                    display: "inline-block",
                    width: "42px"
                  }}
                >
                  Lng:{" "}
                </strong>
                {mousePosition.lng}
              </p>
            </div>
          );
        }}
      />
    )
  );
};

export default MapTooltip;
