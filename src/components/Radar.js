import React, { useMemo } from "react";
import polyfill from "@juggle/resize-observer";
import useMeasure from "react-use-measure";

import { Group } from "@vx/group";
import { Arc } from "@vx/shape";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

import { scaleTime } from "d3-scale";

import ChartTooltip from "./ChartTooltip";
import Clock from "./Clock";

export default ({ ide = "radar", width = 500, sunTimes, date }) => {
  // Container width
  const [ref, bounds] = useMeasure({ scroll: true, polyfill });

  const radius = 260;

  // Scales
  const hourScale = scaleTime()
    .domain([
      moment(sunTimes.start).tz(sunTimes.tz),
      moment(sunTimes.end).tz(sunTimes.tz)
    ])
    .range([0, Math.PI * 2]);

  // Utils

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

  const reSize = fontSize => {
    const s = (fontSize * width) / bounds.width;
    return isFinite(s) ? s : 10;
  };

  const points = genPoints(hours.length, radius);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "flex",
        maxWidth: "600px",
        margin: "0 auto"
      }}
    >
      <ChartTooltip ide={ide} sunTimes={sunTimes} date={date} />

      <div
        style={{
          position: "absolute",
          pointerEvents: "none",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <Clock date={date} sunTimes={sunTimes} radar={true} />
      </div>
      <svg
        style={{ overflow: "visible" }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${width}`}
      >
        <Group top={width / 2} left={width / 2}>
          {sunTimes.phases.map((x, i) => {
            return (
              <Arc
                style={{ cursor: "pointer" }}
                data-for={`tooltip-${ide}`}
                data-tip={JSON.stringify(x)}
                key={`arc${x.id}-${i}`}
                className={x.id}
                startAngle={hourScale(x.from)}
                endAngle={hourScale(x.to)}
                innerRadius={radius - 20}
                outerRadius={radius - 80}
                stroke={x.data.color}
                fill={x.data.color}
              />
            );
          })}

          {/* SOLAR NOON */}
          <Arc
            style={{ pointerEvents: "none", mixBlendMode: "multiply" }}
            key={`arcsolarNoon`}
            className={`arcsolarNoon`}
            startAngle={hourScale(moment(sunTimes.solarNoon).tz(sunTimes.tz))}
            endAngle={hourScale(moment(sunTimes.solarNoon).tz(sunTimes.tz))}
            innerRadius={radius - 20}
            outerRadius={radius - 80}
            fill={"transparent"}
            stroke={"orange"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0, 6"
            opacity="1"
          />

          {bounds.width > 500 && (
            <g>
              <text
                style={{
                  fill: "#0F1012",
                  textAnchor: "middle",
                  dominantBaseline: "central",
                  fontSize: reSize(13),
                  pointerEvents: "none"
                }}
                x={
                  Math.sin(
                    hourScale(moment(sunTimes.solarNoon).tz(sunTimes.tz))
                  ) *
                  (radius - 120)
                }
                y={
                  -Math.cos(
                    hourScale(moment(sunTimes.solarNoon).tz(sunTimes.tz))
                  ) *
                  (radius - 120)
                }
              >
                <tspan
                  x={
                    Math.sin(
                      hourScale(moment(sunTimes.solarNoon).tz(sunTimes.tz))
                    ) *
                    (radius - 120)
                  }
                  dy="0"
                >
                  Solar
                </tspan>
                <tspan
                  x={
                    Math.sin(
                      hourScale(moment(sunTimes.solarNoon).tz(sunTimes.tz))
                    ) *
                    (radius - 120)
                  }
                  dy="1.2em"
                >
                  noon
                </tspan>
              </text>
            </g>
          )}

          {/* NOW */}

          <Arc
            style={{ pointerEvents: "none" }}
            key={`now`}
            className={`now`}
            startAngle={hourScale(moment(date).tz(sunTimes.tz))}
            endAngle={hourScale(moment(date).tz(sunTimes.tz))}
            innerRadius={radius - 20}
            outerRadius={radius - 80}
            fill={"transparent"}
            stroke={"white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0, 6"
            opacity="1"
          />

          <circle
            style={{ pointerEvents: "none" }}
            className="circleNow"
            cx={
              Math.sin(hourScale(moment(date).tz(sunTimes.tz))) * (radius - 50)
            }
            cy={
              -Math.cos(hourScale(moment(date).tz(sunTimes.tz))) * (radius - 50)
            }
            r={18}
            fill="white"
            stroke="black"
            strokeWidth="4"
          />
          <circle
            style={{ pointerEvents: "none" }}
            className="circle"
            cx={
              Math.sin(hourScale(moment(date).tz(sunTimes.tz))) * (radius - 50)
            }
            cy={
              -Math.cos(hourScale(moment(date).tz(sunTimes.tz))) * (radius - 50)
            }
            r={12}
            fill="white"
            strokeWidth="4"
          />

          {hours.map((hour, i) => {
            return (
              <text
                key={`hour${i}`}
                x={points[i].x}
                y={points[i].y}
                style={{
                  fill: "black",
                  textAnchor: "middle",
                  dominantBaseline: "central",
                  fontWeight: 400,
                  opacity: 1,
                  fontSize: reSize(14)
                }}
              >
                {moment(hour).format("H")}
              </text>
            );
          })}
        </Group>
      </svg>
    </div>
  );
};

function genPoints(length, radius) {
  const step = (Math.PI * 2) / length;
  return [...Array(length)].map((_, i) => {
    return {
      x: Math.sin(i * step) * (radius + 10),
      y: -Math.cos(i * step) * (radius + 10)
    };
  });
}
