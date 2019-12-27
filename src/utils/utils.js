export const getHoursMinutes = d => {
  return d.getHours() + ":" + d.getMinutes();
};

export const getMonthsDays = d => {
  return d.getMonth() + "-" + d.getDay();
};

export const secondsToHours = sec => {
  const seconds = Number(sec);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);

  return `${h !== 0 ? `${h} h` : ""} ${m} min ${s} s`;
};

export const capFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const randomString = () => (Math.random() + 1).toString(36).substring(7);

export const dst = (year = new Date().getFullYear()) => {
  //March
  let summer = new Date(); //?
  summer.setFullYear(year, 2, 31);
  summer.setHours(2); //?
  summer.setMinutes(0);
  summer.setSeconds(0);
  summer.setDate(summer.getDate() - summer.getDay()); //?

  //October
  let standard = new Date(); //?
  standard.setFullYear(year, 9, 31); //?
  standard.setHours(3); //?
  standard.setMinutes(0);
  standard.setSeconds(0);
  standard.setDate(standard.getDate() - standard.getDay()); //?

  return [summer, standard];
};

export const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export const getRandomCoords = (from = -180, to = 180, fixed = 3) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

export const getRandomDate = (
  start = new Date(),
  end = new Date(2040, 0, 1)
) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const getTimePercent = date => {
  return ((date.getHours() * 60 + date.getMinutes()) * 100) / 1440;
};
