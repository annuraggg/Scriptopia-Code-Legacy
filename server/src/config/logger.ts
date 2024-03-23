import winston from "winston";
import util from "util";
import moment from "moment-timezone";

// Function to format timestamp
const customTimestamp = () => {
  return moment().utcOffset("+05:30").format("DD/MM/YY HH:mm");
};

// Capitalize first letter of each word
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp({ format: customTimestamp }),
        winston.format.printf((info) => {
          let code = info.code;
          let message = info.message;
          let level = capitalizeFirstLetter(info.level);
          const timestamp = info.timestamp;
          if (info.message instanceof Error) {
            // Print stack trace for Error objects
            message = info.message.stack;
          } else if (typeof info.message === "object") {
            // Stringify objects
            message = util.inspect(info.message, { depth: null });
          }
          return `${timestamp} (${level}): ${info}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "server.log",
      format: winston.format.combine(
        winston.format.timestamp({ format: customTimestamp }),
        winston.format.printf((info) => {
          let code = info.code;
          let message = info.message;
          let level = capitalizeFirstLetter(info.level);
          const timestamp = info.timestamp;
          if (info.message instanceof Error) {
            // Print stack trace for Error objects
            message = info.message.stack;
          } else if (typeof info.message === "object") {
            // Stringify objects
            message = util.inspect(info.message, { depth: null });
          }
          return `${timestamp} (${level}): ${info}`;
        })
      ),
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp({ format: customTimestamp }),
      winston.format.printf((info) => {
        let code = info.code;
        let message = info.message;
        let level = capitalizeFirstLetter(info.level);
        const timestamp = info.timestamp;
        if (info.message instanceof Error) {
          // Print stack trace for Error objects
          message = info.message.stack;
        } else if (typeof info.message === "object") {
          // Stringify objects
          message = util.inspect(info.message, { depth: null });
        }
        return `${timestamp} (${level}): ${JSON.stringify(info.message, null, 2)}`;
      })
    ),
  })
);

export default logger;
