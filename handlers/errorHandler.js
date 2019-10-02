module.exports = () => {
  const errorObj = {
    throwInputValidationError: errorMessage => ({
      errorType: "BadRequest",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      message: errorMessage.toString()
    }),
    throwForbiddenError: errorMessage => ({
      errorType: "Forbidden",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      message: errorMessage.toString()
    }),
    throwUnauthorizedError: errorMessage => ({
      errorType: "Unauthorized",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      message: errorMessage.toString()
    }),
    throwNotFoundError: errorMessage => ({
      errorType: "NotFound",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      message: errorMessage.toString()
    }),
    throwInternalServerError: errorMessage => ({
      errorType: "InternalServerError",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      message: errorMessage.toString()
    })
  };

  return errorObj;
};
