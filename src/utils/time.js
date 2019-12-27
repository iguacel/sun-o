import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";
import tzlookup from "tz-lookup";

export const format = d => {
  return moment(d).format("DD-MM-YY HH:mm");
};

export const getTz = (lat, lng) => {
  return tzlookup(lat, lng);
};

export const toHoursMinutes = date => {
  const hours = moment.utc(date).format("H");
  const minutes = moment.utc(date).format("m");

  return `${
    hours && hours !== "0" ? moment.utc(date).format("H") + "h " : " "
  }${minutes && minutes !== "00" ? moment.utc(date).format("m") + "m" : " "}`;
};
