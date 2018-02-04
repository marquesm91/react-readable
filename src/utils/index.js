const uuidv4 = require('uuid/v4');

export const generateUUID = (options = null) => uuidv4(options);

export const getTimestampAsString = (timestamp = null) => {
  const date = new Date(timestamp || Date.now());

  const [ dayName, month, day, year, time, timezone ] = date.toString().split(' ');

  return { full: date.toString(), dayName, month, day, year, time, timezone };
}
