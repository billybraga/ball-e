const functions = require("firebase-functions");
const {defineString} = require("firebase-functions/params");
const openai = require("openai");

const apiKey = defineString("API_KEY", {default: ""});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.dalle = functions.https.onRequest((request, response) => {
  functions.logger.info("Called with", {prompt: request.data.prompt});
  const conf = new openai.Configuration({
    apiKey: apiKey,
  });
  const api = new openai.OpenAIApi(conf);
  api
      .createImage({
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
      })
      .then((x) => response.send(x.data.data[0]));
});
