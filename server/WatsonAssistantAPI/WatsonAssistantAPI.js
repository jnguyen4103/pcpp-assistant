const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const express = require("express");
const Datastore = require("nedb");
const axios = require("axios");
const Fuse = require("fuse.js");
const findParts = require("./FindParts");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("This is the API that serves up Watson Assistant to the front-end.");
});

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

// This method requests the game API from game-debate.com and creates a list of all the games available for search.
const getGameList = async () => {
  try {
    const response = await axios.get(
      "https://www.game-debate.com/game/api/list"
    );

    const gameList = [];
    response.data.forEach((game) => {
      gameList.push(game["g_title"]);
    });
    return gameList;
  } catch (error) {
    console.error(error);
  }
};

db = new Datastore({ filename: "../SysReqScraperAPI/SysReq.db", autoload: true });

app.post("/getGamesRequirements", (req, res) => {
  getGameList().then((games) => {
    const fuse = new Fuse(games);

    const requirements = req.body.games.map(async (game) => {
      result = fuse.search(game);

      let foundGame = await new Promise((resolve, reject) => {
        db.find({ game: result[0].item }, function (err, docs) {
          resolve(docs[0]);
        });
      });

      return foundGame;
    });

    Promise.all(requirements).then(result => {
      res.send(findParts.buildComputer(result, req.body.budget));
    });
  });
});
