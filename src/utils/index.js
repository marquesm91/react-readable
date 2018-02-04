const uuidv4 = require('uuid/v4');

export const generateUUID = (options = null) => uuidv4(options);
