import React, { useState } from "react";

const GeoLocation = ({ setLocation }) => {
  const [geoLocationMssg, setGeoLocationMssg] = useState(false);

  const getLocation = e => {
    e.preventDefault();

    if (!navigator.geolocation) {
      setGeoLocationMssg("Geolocation N/A ✗");
      return;
    }

    const success = position => {
      const latitude = +position.coords.latitude.toFixed(4);
      const longitude = +position.coords.longitude.toFixed(4);

      setLocation({ lat: latitude, lng: longitude });

      setGeoLocationMssg("Geolocation ✓");
    };

    const error = () => {
      setGeoLocationMssg("Geolocation N/A ✗");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div className="pm max">
      <button
        className={`${!geoLocationMssg ? "pulseButton" : ""} pm small`}
        style={{
          padding: "0.5em 0.7em 0.5em 0.7em"
        }}
        onClick={e => getLocation(e)}
      >
        {geoLocationMssg ? geoLocationMssg : "Geolocation"}
      </button>
    </div>
  );
};

export default GeoLocation;
