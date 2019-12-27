import React from "react";
import { randomMomentDate, getRandomCoords } from "../utils/random";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";
import { testCoords } from "../utils/testCoords";

import { format } from "../utils/time";
import { getTz } from "../utils/time";

import Debug from "./Debug";
import Debug2 from "./Debug2";

const DebugInfo = ({ setDate, setLocation, date, sunTimes, location }) => {
  const handleSelect = event => {
    const { value } = event.target;
    setLocation({ ...testCoords[value] });
  };

  return (
    <div className="max" style={{ fontSize: "70%" }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "2em"
          }}
        >
          <p onClick={() => setDate(randomMomentDate)}>RandomDate</p>
          <p onClick={() => setDate(moment())}>Today</p>
          <p onClick={() => setLocation(getRandomCoords())}>RandomCoords</p>
          {/* SELECT */}
          <select onChange={handleSelect}>
            {Object.entries(testCoords).map(([key, value]) => {
              return (
                <option key={`${key}-select`} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <p className="bold">MeeusSunMoon</p>

      {/* TABLE */}
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>Date</td>
            <td colSpan="2">{format(moment(date).tz(sunTimes.tz))}</td>
          </tr>
          <tr>
            <td>lat, lng</td>
            <td>{location.lat}</td>
            <td>{location.lng}</td>
          </tr>
          <tr>
            <td>tzB</td>
            <td colSpan="2">{getTz(location.lat, location.lng)}</td>
          </tr>
        </tbody>
      </table>

      <Debug sunTimes={sunTimes} />
      <Debug2 sunTimes={sunTimes} />
    </div>
  );
};

export default DebugInfo;
