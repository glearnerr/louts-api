const axios = require("axios");
const https = require("https");
const { config } = require("../config/config");

const GetHandler = (event, errorHandler, cb) => {
  console.log("gggg");
  //instance of axios for non-ssl connection or self signed ssl
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });

  let { httpMethod, queryStringParameters } = event;
  let { imageUrl } = queryStringParameters;
  if (imageUrl) {
    instance.post(config.embeddingUrl, { url: imageUrl }).then(result => {
      if (result.data && result.data.embedding) {
        instance
          .post(config.similarUrl, { embedding: result.data.embedding })
          .then(result => {
            if (result && result.data) {
              let obj = {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({
                  data: result.data,
                  input: { httpMethod, queryStringParameters }
                })
              };
              cb(null, obj);
            } else {
              let obj = {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify(
                  {
                    data: [],
                    input: { httpMethod, queryStringParameters }
                  },
                  null,
                  2
                )
              };
              cb(null, obj);
            }
          })
          .catch(e => {
            cb(JSON.stringify(errorHandler.throwInternalServerError(e)));
          });
      } else {
        let obj = {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            data: { data: [], ids: [] },
            input: { httpMethod, queryStringParameters }
          })
        };
        cb(null, obj);
      }
    });
  } else {
    cb(
      JSON.stringify(
        errorHandler.throwInputValidationError("No parameter imageUrl found")
      )
    );
  }
};

module.exports = { GetHandler };
