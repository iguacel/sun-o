import React from "react";
import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

const Info = ({ sunTimes, isTimeline, setIsTimeline, date }) => {
  // Render
  return (
    <div
      style={{
        padding: "1em",
        maxWidth: "500px",
        margin: "0 auto"
      }}
    >
      <div
        className="center"
        style={{
          fontSize: "80%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        {/* Time to sunrise / sunset */}
        {sunTimes.daylength.next && (
          <p className="large pm">
            {sunTimes.daylength.nextSun} until{" "}
            <strong>{sunTimes.daylength.next}</strong>
          </p>
        )}

        {/* Next phase start */}
        {sunTimes.currentPhase.nextPhase && (
          <p className="pm">
            <strong style={{ color: sunTimes.currentPhase.nextPhase.data.bg }}>
              {sunTimes.currentPhase.nextPhase.data.name}
            </strong>{" "}
            {moment(sunTimes.currentPhase.nextPhase.from)
              .tz(sunTimes.tz)
              .from(moment(date).tz(sunTimes.tz))}
          </p>
        )}
      </div>

      <div
        style={{
          width: "100%",
          padding: "1em",
          position: "relative",
          fontSize: "80%"
        }}
        className="infoWrapper center"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {sunTimes.times
            .filter(x => x.id === "sunset" || x.id === "sunrise")
            .map(x => {
              return (
                <p className="pm" key={`sunInfo${x.id}`}>
                  <strong>{x.name}</strong> <br />
                  {moment(x.date)
                    .tz(sunTimes.tz)
                    .format("HH:mm")}
                </p>
              );
            })}
        </div>

        <p className="pm">
          <strong>Daylength</strong> <br />
          {sunTimes.daylength.duration}
        </p>
      </div>

      {/* Button timeline */}
      <div className="center">
        <button
          className="pm small"
          style={{
            padding: "0.5em 0.7em 0.5em 0.7em",
            marginTop: "1em"
          }}
          onClick={() => setIsTimeline(!isTimeline)}
        >
          {isTimeline ? "View clock" : "View timeline"}
        </button>
      </div>
    </div>
  );
};

export default Info;
