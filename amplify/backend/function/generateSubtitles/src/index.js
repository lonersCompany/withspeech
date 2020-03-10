/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const polly = new AWS.Polly();
const s3 = new AWS.S3({
  params: {
    Bucket: "text-with-speech"
  }
});

exports.handler = async event => {
  // Step 1: translate the text

  let responseBody = {};
  let statusCode = 0;

  const { text, voice, key, ssml } = event.arguments;

  //var pollySubtitlesParams = Object.assign({SpeechMarkTypes: ["sentence"]}, pollyParams);

  try {
    const pollyAudioParams = {
      OutputFormat: "json",
      Text: text,
      TextType: ssml ? "ssml" : "text",
      VoiceId: voice,
      SpeechMarkTypes: ["sentence"]
    };

    const pollyResponse = await polly
      .synthesizeSpeech(pollyAudioParams)
      .promise();

    const { ContentType, AudioStream } = pollyResponse;
    // Create JSON FORM JS oBJECT

    const AudioStreamObj = AudioStream.toString()
      .split(/\r?\n/)
      .filter(string => string !== "")
      .map(string => JSON.parse(string));

    const retrunObj = AudioStreamObj.map((obj, index, array) => {
      const startTime = obj.time;
      let endTme = 999999;
      if (array[index + 1]) {
        endTme = array[index + 1].time;
      }

      return {
        value: obj.value,
        start: startTime,
        end: endTme
      };
    });

    //const AudioStreamObj = JSON.stringify(AudioStream)

    responseBody = {
      key: key,
      stream: retrunObj
    };
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put user data`;
    statusCode = 403;
  }

  // Create main response message
  const response = JSON.stringify({
    statusCode: statusCode,
    headers: {
      header: "Synthetize text"
    },
    body: responseBody
  });

  return response;
};
