const uuidv4 = require('uuid/v4');

export const generateUUID = (options = null) => uuidv4(options);

export const getTimestampAsString = (timestamp, region) => (
  timestamp
    ? new Date(timestamp).toLocaleString(region || 'en')
    : new Date().toLocaleString(region || 'en')
);
