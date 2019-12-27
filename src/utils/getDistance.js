export const rad = x => {
  return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2, miles = false) => {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (miles) {
    return getMiles(d);
  }
  return getKm(d); // returns the distance in meter
};

export const getKm = n => +(n / 1000).toFixed(2);

export const getMiles = n => +(n / 1600).toFixed(2);
