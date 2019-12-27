import React from "react";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

const Debug = ({ sunTimes }) => {
  return (
    <div>
      <p className="bold">sunTimes.phases</p>

      <table style={{ width: "100%" }}>
        <tbody>
          {sunTimes.times.map(x => {
            return (
              <tr
                key={`times${x.id}`}
                style={{ fontWeight: x.id === "sunrise" ? 600 : 400 }}
              >
                <td>
                  {moment(x.date)
                    .tz(sunTimes.tz)
                    .format("HH:mm")}
                </td>
                <td colSpan="2">{x.name}</td>
              </tr>
            );
          })}

          <tr>
            <td>
              {moment(sunTimes.solarNoon)
                .tz(sunTimes.tz)
                .format("D - HH:mm")}
            </td>
            <td colSpan="2">SolarNoon</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Debug;
