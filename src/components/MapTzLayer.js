import React from "react";
import * as topojson from "topojson-client";

import { CustomProjection } from "@vx/geo";

import useMousePosition from "../hooks/useMousePositionCoords";
import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

import { scaleLinear } from "d3-scale";
import { geoCircle, geoEquirectangular } from "d3-geo";

import * as solar from "solar-calculator";

import topology from "../maps/world-110-simplified-min";
import MapTooltip from "./MapTooltip";

const world = topojson.feature(topology, topology.objects.units);

const Map = ({
  width = 942.6,
  height = 471.8,
  location,
  setLocation,
  ide = "map"
}) => {
  const [mousePosition, ref] = useMousePosition(
    0, // enterDelay
    0, // leaveDelay
    30, // fps,
    location // location
  );

  let projection = geoEquirectangular;

  const scaleFactor = 630;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / scaleFactor) * 100;

  const date = moment();

  const latScaleInverse = scaleLinear()
    .domain([90, -90])
    .range([0, height])
    .clamp(true);

  const lngScaleInverse = scaleLinear()
    .domain([-180, 180])
    .range([0, width])
    .clamp(true);

  const locationNow = {
    lat: latScaleInverse(location.lat),
    lng: lngScaleInverse(location.lng)
  };

  const sun = () => {
    const now = new Date();
    const day = new Date(+now).setUTCHours(0, 0, 0, 0);
    const t = solar.century(now);
    const longitude = ((day - now) / 864e5) * 360 - 180;
    return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
  };

  const antipode = ([longitude, latitude]) => {
    return [longitude + 180, -latitude];
  };

  const offsets = [
    { id: "night", offset: 18, color: "RGBA(37, 75, 138, 0.50)" },
    {
      id: "astronomicalTwilight",
      offset: 12,
      color: "RGBA(37, 75, 138, 0.50)"
    },
    { id: "nauticalTwilight", offset: 6, color: "RGBA(37, 75, 138, 0.30)" },
    { id: "civilTwilight", offset: 0, color: "RGBA(37, 75, 138, 0.20)" }
  ];

  const light = [
    { id: "night", offset: 0, color: "RGBA(251, 244, 193, 0.50)" }
  ];

  const terminator = offset => {
    return geoCircle()
      .radius(90 - offset)
      .center(antipode(sun()))();
  };

  const terminatorLight = offset => {
    return geoCircle()
      .radius(90 - offset)
      .center(sun())();
  };

  return (
    <div
      ref={ref}
      style={{
        height: "auto",
        position: "relative",
        cursor: "pointer",
        select: "none"
      }}
    >
      <MapTooltip
        type="light"
        ide={ide}
        mousePosition={mousePosition}
        date={date}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        x="0"
        y="0"
        version="1.1"
        viewBox="0 0 942.6 471.8"
        xmlSpace="preserve"
        style={{ overflow: "visible" }}
      >
        {/* NIGHT */}
        <CustomProjection
          projection={projection}
          data={world.features}
          scale={scale}
          translate={[centerX, centerY]}
        >
          {customProjection => {
            return (
              <g>
                <g>
                  {/* NIGHT PATH */}
                  {light.map(x => {
                    return (
                      <path
                        style={{
                          mixBlendMode: "multiply",
                          isolation: "isolate"
                        }}
                        key={`twilight-${x.id}`}
                        d={customProjection.path(terminatorLight(x.offset))}
                        fill={x.color}
                      />
                    );
                  })}
                </g>
                {/* NIGHT PATH */}
                {offsets.map(x => {
                  return (
                    <path
                      style={{ mixBlendMode: "multiply", isolation: "isolate" }}
                      key={`twilight-${x.id}`}
                      d={customProjection.path(terminator(x.offset))}
                      fill={x.color}
                    />
                  );
                })}
              </g>
            );
          }}
        </CustomProjection>
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          data-for={`tooltip-${ide}`}
          data-tip={"Map"}
          type="light"
          fill="transparent"
          onClick={() =>
            mousePosition.tz &&
            setLocation({ lat: mousePosition.lat, lng: mousePosition.lng })
          }
        />

        <circle
          className="circleNow"
          style={{
            pointerEvents: "none"
          }}
          cx={locationNow.lng}
          cy={locationNow.lat}
          r={30}
          fill="transparent"
        />

        <line
          x1={locationNow.lng}
          y1={-500}
          x2={locationNow.lng}
          y2={height}
          style={{
            stroke: "RGBA(245, 184, 69, 1)",
            pointerEvents: "none",
            strokeWidth: 1.5
          }}
        />
        <line
          x1={0}
          y1={locationNow.lat}
          x2={width}
          y2={locationNow.lat}
          style={{
            stroke: "RGBA(245, 184, 69, 1)",
            pointerEvents: "none",
            strokeWidth: 1.5
          }}
        />
        <circle
          className="circle"
          style={{
            pointerEvents: "none"
          }}
          cx={locationNow.lng}
          cy={locationNow.lat}
          r={4}
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Map;
