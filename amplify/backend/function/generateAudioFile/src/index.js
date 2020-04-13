/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiDocumentAPIGraphQLAPIIdOutput = process.env.API_DOCUMENTAPI_GRAPHQLAPIIDOUTPUT
var apiDocumentAPIGraphQLAPIEndpointOutput = process.env.API_DOCUMENTAPI_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const polly = new AWS.Polly();
const s3 = new AWS.S3({
  params: {
    Bucket: "text-with-speech",
  },
});

exports.handler = async (event) => {
  // Step 1: translate the text

  let responseBody = {};
  let statusCode = 0;

  const { text, voice, key, ssml } = event.arguments;

  //var pollySubtitlesParams = Object.assign({SpeechMarkTypes: ["sentence"]}, pollyParams);

  try {
    const pollyAudioParams = {
      OutputFormat: "mp3",
      Text: text,
      TextType: ssml ? "ssml" : "text",
      VoiceId: voice,
    };

    const { AudioStream } = await polly
      .synthesizeSpeech(pollyAudioParams)
      .promise();

    const s3params = {
      Key: key,
      ContentType: "audio/mpeg",
      Body: AudioStream,
      ACL: "public-read",
    };

    const dataS3 = await s3.putObject(s3params).promise();

    responseBody.audio = {
      key: key,
      text: pollyAudioParams.text,
    };
    statusCode = 201;
  } catch (err) {
    responseBody.audio = `Unable to put user data`;
    statusCode = 403;
  }

  // Create main response message
  const response = JSON.stringify({
    statusCode: statusCode,
    headers: {
      header: "Synthetize text",
    },
    body: responseBody,
  });

  return response;
};
