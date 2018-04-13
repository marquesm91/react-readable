const uuidv4 = require('uuid/v4');

export const generateUUID = (options = null) => uuidv4(options);

export const getTimestampAsString = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : Date();

  const [ day_week, month, day, year, hours ] = date.toString().split(' ');
  const [ hour, minute ] = hours.split(':');

  return `${month} ${day}'${year.substring(2)} at ${hour}:${minute}`;
};
