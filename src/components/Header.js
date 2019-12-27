import React from "react";
import GeoLocation from "./GeoLocation";

function Header({ setLocation }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        width: "100%"
      }}
    >
      <h1
        className="pm"
        style={{
          fontSize: "130%",
          flex: 1,
          padding: "1em 0.5em 0.5em 0.5em",
          fontWeight: 600,
          marginLeft: "0.3em"
        }}
      >
        sun <span style={{ fontSize: "80%" }}>●</span>)))
      </h1>

      <GeoLocation setLocation={setLocation} />
    </div>
  );
}

export default Header;
