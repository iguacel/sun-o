import React from "react";

import MapTzLayer from "./MapTzLayer";
import MapBgLayer from "./MapBgLayer";

function Map({ location, setLocation }) {
  return (
    <div
      style={{
        position: "relative",
        cursor: "pointer"
      }}
    >
      <div
        style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <MapTzLayer location={location} setLocation={setLocation} />
      </div>

      <MapBgLayer />
    </div>
  );
}

export default Map;
