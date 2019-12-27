import React, { useState } from "react";
import useInterval from "./hooks/useInterval";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

import Header from "./components/Header";
import Map from "./components/Map";
import Location from "./components/Location";
import Timeline from "./components/Timeline";
import Radar from "./components/Radar";
import SunInfo from "./components/SunInfo";
import Footer from "./components/Footer";

import DebugInfo from "./components/DebugInfo";

import "./styles/App.css";

import { getSunTimes } from "./utils/getTimes";

const debug = false;

function App() {
  const [date, setDate] = useState(moment());
  const [location, setLocation] = useState({ lat: 36.52978, lng: -6.29465 });
  const [isTimeline, setIsTimeline] = useState(true);

  // Interval date for minutes
  useInterval(() => {
    setDate(
      moment(date)
        .tz(sunTimes.tz)
        .add(1, "minute")
    );
  }, 60000);

  const sunTimes = getSunTimes(date, location);
  // console.log(sunTimes);

  return (
    <div className="App">
      <Header setLocation={setLocation} />
      <Map location={location} setLocation={setLocation} />
      <Location sunTimes={sunTimes} location={location} />

      {isTimeline ? (
        <Timeline sunTimes={sunTimes} date={date} />
      ) : (
        <Radar sunTimes={sunTimes} width={600} date={date} />
      )}

      {/* Debug */}
      <SunInfo
        sunTimes={sunTimes}
        setDate={setDate}
        isTimeline={isTimeline}
        setIsTimeline={setIsTimeline}
      />
      {/* Debug */}
      {debug && (
        <DebugInfo
          sunTimes={sunTimes}
          setDate={setDate}
          location={location}
          setLocation={setLocation}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
