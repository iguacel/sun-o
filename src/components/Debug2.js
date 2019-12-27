import React from "react";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

const Debug = ({ sunTimes }) => {
  return (
    <div>
      <p className="bold">sunTimes.phases</p>
      <p>{sunTimes.polarNight ? "Polar night" : ""}</p>
      <p>{sunTimes.midnightSun ? "Mindnight sun" : ""}</p>

      <table style={{ width: "100%" }}>
        <tbody>
          {sunTimes.phases.map(x => {
            return (
              <tr key={`times${x.id}`}>
                <td>{x.data.name}</td>
                <td>
                  {moment(x.from)
                    .tz(sunTimes.tz)
                    .format("HH:mm")}
                </td>
                <td>
                  {moment(x.to)
                    .tz(sunTimes.tz)
                    .format("HH:mm")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Debug;
