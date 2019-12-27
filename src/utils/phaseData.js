const phasesId = {
  main: "RGBA(33, 38, 43, 1.00)",
  bg: "RGBA(21, 26, 32, 1.00)",
  gray: "RGBA(56, 66, 76, 1.00)",
  daylight: {
    color: "RGBA(246, 233, 129, 0.50)",
    id: "daylight",
    name: "Daylight",
    bg: "RGBA(237, 181, 70, 1.00)"
  },
  night: {
    color: "RGBA(47, 71, 118, 1.00)",
    id: "night",
    name: "Night",
    bg: "RGBA(47, 71, 118, 1.00)"
  },
  astronomical_twilight: {
    color: "RGBA(81, 108, 152, 1.00)",
    id: "astronomical_twilight",
    name: "Astronomical twilight",
    bg: "RGBA(81, 108, 152, 1.00)"
  },
  nautical_twilight: {
    color: "RGBA(148, 171, 200, 1.00)",
    id: "nautical_twilight",
    name: "Nautical twilight",
    bg: "RGBA(148, 171, 200, 1.00)"
  },
  civil_twilight: {
    color: "RGBA(207, 219, 232, 1.00)",
    id: "civil_twilight",
    name: "Civil twilight",
    bg: "RGBA(148, 171, 200, 0.80)"
  }
};

export default {
  start_astronomicalDawn: { ...phasesId.night },
  astronomicalDawn_nauticalDawn: { ...phasesId.astronomical_twilight },
  nauticalDawn_civilDawn: { ...phasesId.nautical_twilight },
  civilDawn_sunrise: { ...phasesId.civil_twilight },
  sunrise_sunset: { ...phasesId.daylight },
  sunset_civilDusk: { ...phasesId.civil_twilight },
  civilDusk_nauticalDusk: { ...phasesId.nautical_twilight },
  nauticalDusk_astronomicalDusk: { ...phasesId.astronomical_twilight },
  astronomicalDusk_end: { ...phasesId.night },
  unico_polarNight: { ...phasesId.night },
  unico_midnightSun: { ...phasesId.daylight },
  start_sunrise: { ...phasesId.civil_twilight },
  sunset_end: { ...phasesId.civil_twilight },
  start_civilDawn: { ...phasesId.nautical_twilight },
  civilDusk_end: { ...phasesId.nautical_twilight },
  start_nauticalDawn: { ...phasesId.astronomical_twilight },
  nauticalDusk_end: { ...phasesId.astronomical_twilight },
  astronomicalDawn_astronomicalDusk: { ...phasesId.astronomical_twilight },
  nauticalDawn_nauticalDusk: { ...phasesId.nautical_twilight },
  civilDawn_civilDusk: { ...phasesId.civil_twilight }
};
