import {
  astronomicalDawn,
  astronomicalDusk,
  civilDawn,
  civilDusk,
  nauticalDawn,
  nauticalDusk,
  solarNoon,
  sunrise,
  sunset
  // formatCI,
  // options,
  // yearMoonPhases
} from "meeussunmoon";

import phaseData from "./phaseData";

import { toHoursMinutes } from "./time";

import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

import tzlookup from "tz-lookup";

const getDaylength = (date, location, tz, polarNight, midnightSun) => {
  if (polarNight) {
    return { duration: "0 h (polar night)", nextSun: "" };
  }
  if (midnightSun) {
    return { duration: "24 h (midnight sun)", nextSun: "" };
  }

  const sunriseDate = {
    id: "sunrise",
    name: "Sunrise",
    date: sunrise(moment(date).tz(tz), location.lat, location.lng)
  };

  const sunsetDate = {
    id: "sunset",
    name: "Sunset",
    date: sunset(moment(date).tz(tz), location.lat, location.lng)
  };

  const next = [sunriseDate, sunsetDate].filter(x => {
    return moment(x.date).isAfter(moment(date).tz(tz));
  })[0];

  const daylength = moment(sunsetDate.date)
    .tz(tz)
    .diff(moment(sunriseDate.date).tz(tz));

  const nextDuration =
    next &&
    moment(moment(next.date))
      .tz(tz)
      .diff(moment(date).tz(tz));

  return {
    duration: toHoursMinutes(daylength),
    next: next ? next.id : undefined,
    nextSun: nextDuration ? toHoursMinutes(nextDuration) : undefined
  };
};

const getCurrentPhase = (phases, polarNight, midnightSun, date) => {
  const currentPhaseIndex = phases.findIndex(x => x.currentPhase);

  const currentPhase = phases[currentPhaseIndex];

  const nextPhase =
    currentPhaseIndex === phases.length - 1
      ? false
      : phases[currentPhaseIndex + 1];

  if (polarNight || midnightSun) {
    return {
      ...currentPhase,
      nextPhase,
      name: polarNight ? "Polar Night" : "Midnight Sun"
    };
  } else {
    return {
      ...currentPhase,
      nextPhase
    };
  }
};

const getPhases = (times, tz, start, end, polarNight, midnightSun, date) => {
  let phases = [];

  if (times.length === 0) {
    phases = [
      {
        id: `unico_${polarNight ? "polarNight" : "midnightSun"}`,
        data: phaseData[`unico_${polarNight ? "polarNight" : "midnightSun"}`],
        from: moment(start).tz(tz),
        to: moment(end).tz(tz),
        duration: moment.duration(
          moment(end)
            .tz(tz)
            .diff(moment(start).tz(tz))
        ),
        currentPhase: true
      }
    ];
  } else {
    phases = times
      .map((x, i) => {
        if (i === 0) {
          return {
            id: `start_${x.id}`,
            data: phaseData[`start_${x.id}`],
            from: moment(start).tz(tz),
            to: moment(x.date).tz(tz),
            duration: moment.duration(
              moment(times[times.length - 1].date)
                .tz(tz)
                .diff(moment(x.date).tz(tz))
            ),
            currentPhase: moment(moment(date).tz(tz)).isBetween(
              moment(start).tz(tz),
              moment(x.date).tz(tz)
            )
          };
        }
        return {
          id: `${times[i - 1].id}_${x.id}`,
          data: phaseData[`${times[i - 1].id}_${x.id}`],
          from: moment(times[i - 1].date).tz(tz),
          to: moment(x.date).tz(tz),
          duration: moment.duration(
            moment(x.date)
              .tz(tz)
              .diff(moment(times[i - 1].date).tz(tz))
          ),
          currentPhase: moment(moment(date).tz(tz)).isBetween(
            moment(times[i - 1].date).tz(tz),
            moment(x.date).tz(tz)
          )
        };
      })
      .concat([
        {
          id: `${times[times.length - 1].id}_end`,
          data: phaseData[`${times[times.length - 1].id}_end`],
          from: moment(times[times.length - 1].date).tz(tz),
          to: moment(end).tz(tz),
          duration: moment.duration(
            moment(times[times.length - 1].date)
              .tz(tz)
              .diff(moment(times[0].date).tz(tz))
          ),
          currentPhase: moment(moment(date).tz(tz)).isBetween(
            moment(times[times.length - 1].date).tz(tz),
            moment(end).tz(tz)
          )
        }
      ]);
  }

  return {
    phases: phases,
    currentPhase: getCurrentPhase(phases, polarNight, midnightSun, date)
  };
};

//PN Polar night
//NCD
//NND
//NAD

//'--' for polar night and '**' midngight sun

export const getSunTimes = (date, location) => {
  const tzB = tzlookup(location.lat, location.lng);
  const sn = solarNoon(moment(date).tz(tzB), location.lng);

  const tz = tzB;

  const start = moment(date)
    .tz(tzB)
    .startOf("day");
  const end = moment(date)
    .tz(tzB)
    .endOf("day");

  const polarNight =
    sunrise(moment(date).tz(tzB), location.lat, location.lng) === "PN" ||
    sunset(moment(date).tz(tzB), location.lat, location.lng) === "PN"
      ? true
      : false;

  const midnightSun =
    sunrise(moment(date).tz(tzB), location.lat, location.lng) === "MS" ||
    sunset(moment(date).tz(tzB), location.lat, location.lng) === "MS"
      ? true
      : false;

  const times = [
    {
      id: "sunrise",
      name: "Sunrise",
      date: sunrise(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "sunset",
      name: "Sunset",
      date: sunset(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "civilDawn",
      name: "Civil Dawn",
      date: civilDawn(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "civilDusk",
      name: "Civil Dusk",
      date: civilDusk(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "nauticalDawn",
      name: "Nautical Dawn",
      date: nauticalDawn(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "nauticalDusk",
      name: "Nautical Dusk",
      date: nauticalDusk(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "astronomicalDawn",
      name: "Astronomical Dawn",
      date: astronomicalDawn(moment(date).tz(tzB), location.lat, location.lng)
    },
    {
      id: "astronomicalDusk",
      name: "Astronomical Dusk",
      date: astronomicalDusk(moment(date).tz(tzB), location.lat, location.lng)
    }
  ];

  const timesFiltered = times
    .filter(x => moment(x.date).isValid())
    .sort((a, b) =>
      moment(a.date)
        .tz(tzB)
        .diff(moment(b.date))
    );

  return {
    tz,
    location,
    date,
    times: timesFiltered,
    timesLength: timesFiltered.length,
    polarNight,
    midnightSun,
    solarNoon: sn,
    daylength: getDaylength(date, location, tz, polarNight, midnightSun),
    start,
    end,
    ...getPhases(timesFiltered, tz, start, end, polarNight, midnightSun, date)
  };
};
