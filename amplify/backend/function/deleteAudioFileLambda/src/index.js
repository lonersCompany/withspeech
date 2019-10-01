/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiDocumentAPIGraphQLAPIIdOutput = process.env.API_DOCUMENTAPI_GRAPHQLAPIIDOUTPUT
var apiDocumentAPIGraphQLAPIEndpointOutput = process.env.API_DOCUMENTAPI_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  params: {
    Bucket: "text-with-speech"
  }
});

exports.handler = async event => {
  const { key } = event.arguments;

  let responseBody = {};
  let statusCode = 0;

  var params = {
    Key: key
  };
  //eslint-disable-line
  try {
    const dataS3 = await s3.deleteObject(params).promise();
    responseBody = { message: `File ${key} is deleted` };
    statusCode = 201;
  } catch (err) {
    responseBody = { message: `Unable to delete file ${key}` };
    statusCode = 403;
  }
  const response = JSON.stringify({
    statusCode: statusCode,
    headers: {
      header: "Synthetize text"
    },
    body: responseBody
  });

  return response;
};
