const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logger = createLogger({
    level: 'error', // Only log errors
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }), // Include stack trace
      format.json()
    ),
    transports: [
      new transports.File({ filename: path.join(__dirname, '../logs/error.log') })
    ],
  });
  
  module.exports = logger;