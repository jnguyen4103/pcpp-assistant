const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send('This is the API that serves up Watson Assistant to the front-end.');
})

// Create Assistant service object.
const assistant = new AssistantV2({
  version: "2021-02-22",
  authenticator: new IamAuthenticator({
    apikey: "0PVjD3rkG8KdwSDXLT2TZZPjEVZVkzsS-mXI1EZR9zLI",
  }),
  url: "https://api.us-south.assistant.watson.cloud.ibm.com",
});

const assistantId = "2303c86f-1b64-42d7-aae9-bb3435f312f0";

app.get("/getAssistantID", (req, res) => {
  let sessionId = assistant
    .createSession({
      assistantId: assistantId,
    })
    .then((res) => {
      return JSON.stringify(res.result, null, 2);
    })
    .catch((err) => {
      console.log(err);
    });

  sessionId = sessionId.then((id) => {
    res.send(id);
  });
});

app.post("/getAssistantResponse", (req, res) => {
  let assistantResponse = assistant
    .message({
      assistantId: assistantId,
      sessionId: req.body.sessionId,
      input: {
        message_type: "text",
        text: req.body.userMessage,
      },
    })
    .then((res) => {
      return JSON.stringify(res.result, null, 2);
    })
    .catch((err) => {
      console.log(err);
    });

    assistantResponse.then((response) => {
      res.send(response);
    });
});
