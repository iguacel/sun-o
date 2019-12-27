import moment from "moment-timezone/builds/moment-timezone-with-data-10-year-range";

const getRandomInt = (from = 1, to = 10, fixed = 0) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export const randomMomentDate = () => {
  const year = 2020;
  const month = String(getRandomInt(1, 6)).padStart(2, "0");
  const day = String(getRandomInt(1, 26)).padStart(2, "0");
  const random = `${year}-${month}-${day}T12:00:00`;
  return moment(random).tz("Europe/Madrid");
};

export const getRandomLng = (from = -180, to = 180, fixed = 3) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export const getRandomLat = (from = -90, to = 90, fixed = 3) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export const getRandomCoords = () => {
  return {
    lat: getRandomLat(),
    lng: getRandomLng()
  };
};
