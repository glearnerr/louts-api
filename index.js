const errorHandlerModule = require("./handlers/errorHandler.js");
const getHandler = require("./handlers/getHandler");

module.exports.handler = (event, context, cb) => {
  const errorHandler = errorHandlerModule();
  context.callbackWaitsForEmptyEventLoop = false;
  if (event && event.httpMethod && event.httpMethod === "GET")
    getHandler.GetHandler(event, errorHandler, cb);
};
