import React, { useMemo, Fragment } from "react";
import { Line, LinePath, Polygon } from "@vx/shape";
import polyfill from "@juggle/resize-observer";
import useMeasure from "react-use-measure";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

import ChartTooltip from "./ChartTooltip";
import Clock from "./Clock";

import { scaleTime } from "d3-scale";

const stroke = 45;
const marginTop = stroke + 20;

const Timeline = ({ ide = "timeline", height = 150, sunTimes, date }) => {
  // Size Container
  const [ref, bounds] = useMeasure({ scroll: true, polyfill });
  // Scales
  const hourScale = scaleTime()
    .domain([
      moment(sunTimes.start).tz(sunTimes.tz),
      moment(sunTimes.end).tz(sunTimes.tz)
    ])
    .range([0, bounds.width]);

  const horasScale = scaleTime()
    .domain([
      moment({
        year: moment(sunTimes.start).year(),
        month: moment(sunTimes.start).month(),
        day: moment(sunTimes.start).date(),
        hour: 0
      }),
      moment({
        year: moment(sunTimes.end).year(),
        month: moment(sunTimes.end).month(),
        day: moment(sunTimes.end).date(),
        hour: 23
      })
    ])
    .range([0, bounds.width]);

  const hours = useMemo(() => {
    let items = [];
    new Array(24).fill().forEach((acc, index) => {
      items.push(
        moment({
          year: moment(sunTimes.start).year(),
          month: moment(sunTimes.start).month(),
          day: moment(sunTimes.start).date(),
          hour: index
        })
      );
    });
    return items;
  }, [sunTimes.start]);

  // Render
  return (
    <div
      ref={ref}
      style={{ padding: "0 0.5em 1em 0.5em" }}
      className="dayWrapper center"
    >
      <ChartTooltip ide={ide} sunTimes={sunTimes} date={date} />

      <Clock date={date} sunTimes={sunTimes} />

      <svg
        style={{
          overflow: "visible"
        }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${bounds.width} ${height}`}
      >
        {/* PHASES */}
        {sunTimes.phases.map((x, i) => {
          return (
            <Line
              style={{ cursor: "pointer" }}
              data-for={`tooltip-${ide}`}
              data-tip={JSON.stringify(x)}
              className={x.id}
              key={`line${x.id}-${i}`}
              id={x.id}
              from={{ x: hourScale(x.from), y: marginTop + stroke / 2 }}
              to={{
                x: hourScale(x.to) + 1,
                y: marginTop + stroke / 2
              }}
              stroke={x.data.color}
              strokeWidth={stroke}
            />
          );
        })}

        {/* HOURS */}
        <g>
          {hours.map((hour, i) => {
            return (
              <Fragment key={`hour${i}`}>
                <Line
                  style={{ pointerEvents: "none" }}
                  from={{
                    x: horasScale(moment(hour).tz(sunTimes.tz)),
                    y: marginTop
                  }}
                  to={{
                    x: horasScale(moment(hour).tz(sunTimes.tz)),
                    y: marginTop + stroke
                  }}
                  stroke={"RGBA(105, 106, 207, 0.2)"}
                  strokeWidth={1}
                />
                <text
                  x={horasScale(hour)}
                  y={marginTop + stroke + 35}
                  style={{
                    fill: "black",
                    fontSize: "0.7em",
                    textAnchor: "middle"
                  }}
                >
                  {moment(hour).hour() !== 0 && moment(hour).hour() % 2 === 0
                    ? moment(hour).format("H")
                    : ""}
                </text>
              </Fragment>
            );
          })}
        </g>

        {/* NOW */}
        <circle
          style={{ pointerEvents: "none" }}
          className="circleNow"
          cx={hourScale(moment(date).tz(sunTimes.tz))}
          cy={marginTop + stroke / 2}
          r={5}
          fill="white"
          stroke="black"
          strokeWidth="4"
        />
        <circle
          style={{ pointerEvents: "none" }}
          className="circle"
          cx={hourScale(moment(date).tz(sunTimes.tz))}
          cy={marginTop + stroke / 2}
          r={4}
          fill="white"
          strokeWidth="4"
        />

        {/* CONNECTOR */}
        <LinePath
          data={[
            [bounds.width / 2, 0],
            [bounds.width / 2, 30],
            [hourScale(moment(date).tz(sunTimes.tz)), 30],
            [
              hourScale(moment(date).tz(sunTimes.tz)),
              marginTop + stroke / 2 - 30
            ]
          ]}
          stroke={"RGBA(210, 211, 212, 1.00)"}
          strokeWidth={2}
        />

        <Polygon
          sides={3}
          size={6}
          fill={"RGBA(33, 38, 43, 1.00)"}
          rotate={-90}
          center={{
            x: hourScale(moment(date).tz(sunTimes.tz)),
            y: marginTop + stroke / 2 - 34
          }}
        />
      </svg>
    </div>
  );
};

export default Timeline;
