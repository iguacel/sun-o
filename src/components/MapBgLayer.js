import React from "react";
import * as topojson from "topojson-client";
import { CustomProjection, Graticule } from "@vx/geo";

import { geoEquirectangular } from "d3-geo";

import topology from "../maps/world-110-simplified-min";
const world = topojson.feature(topology, topology.objects.units);

function MapBgLayer({ width = 942.6, height = 471.8, events = false }) {
  let projection = geoEquirectangular;

  const scaleFactor = 630;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / scaleFactor) * 100;

  return (
    <div style={{ background: "white" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <CustomProjection
          projection={projection}
          data={world.features}
          scale={scale}
          translate={[centerX, centerY]}
        >
          {customProjection => {
            return (
              <g>
                <Graticule
                  graticule={g => customProjection.path(g)}
                  stroke="RGBA(105, 106, 207, 0.10)"
                />
                {customProjection.features.map((feature, i) => {
                  return (
                    <path
                      key={`map-${i}`}
                      d={feature.path}
                      fill="RGBA(33, 38, 43, 1.00)"
                      stroke="white"
                      strokeWidth={0.5}
                    />
                  );
                })}
              </g>
            );
          }}
        </CustomProjection>
      </svg>
    </div>
  );
}

export default React.memo(MapBgLayer);
