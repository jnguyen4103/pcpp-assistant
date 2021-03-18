const puppeteer = require("puppeteer");
const axios = require("axios");
const Datastore = require("nedb");

// This dictionary contains the relevant page element's xpath along with their fallbacks in case a game doesn't have a certain xpath
const elementWithPaths = {
  intelCpu: {
    xPath:
      '//*[@id="sys-req-mobile-container"]/div[3]/div/div[4]/div[1]/div[1]/div[1]/a',
    fallBack1:
      '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[1]/div[1]/div[1]/a',
    fallBack2:
      '//*[@id="sys-req-mobile-container"]/div[1]/div/div[4]/div[1]/div[1]/div[1]/a',
  },
  amdCpu: {
    xPath:
      '//*[@id="sys-req-mobile-container"]/div[3]/div/div[4]/div[1]/div[1]/div[2]/a',
    fallBack1:
      '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[1]/div[1]/div[2]/a',
    fallBack2:
      '//*[@id="sys-req-mobile-container"]/div[1]/div/div[4]/div[1]/div[1]/div[2]/a',
  },
  nvidiaGpu: {
    xPath:
      '//*[@id="sys-req-mobile-container"]/div[3]/div/div[4]/div[2]/div[1]/div[1]/a',
    fallBack1:
      '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[2]/div[1]/div[1]/a',
    fallBack2:
      '//*[@id="sys-req-mobile-container"]/div[1]/div/div[4]/div[2]/div[1]/div[1]/a',
  },
  amdGpu: {
    xPath:
      '//*[@id="sys-req-mobile-container"]/div[3]/div/div[4]/div[2]/div[1]/div[2]/a',
    fallBack1:
      '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[2]/div[1]/div[2]/a',
    fallBack2:
      '//*[@id="sys-req-mobile-container"]/div[1]/div/div[4]/div[2]/div[1]/div[2]/a',
  },
  memory: {
    xPath:
      '//*[@id="sys-req-mobile-container"]/div[3]/div/div[4]/div[4]/div[1]/span',
    fallBack1:
      '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[4]/div[1]/span',
    fallBack2:
      '//*[@id="sys-req-mobile-container"]/div[1]/div/div[4]/div[4]/div[1]/span',
  },
};

// This method requests the game API from game-debate.com and creates a dictionary linking each game's name to their ID.
const getGameDict = async () => {
  try {
    const response = await axios.get(
      "https://www.game-debate.com/game/api/list"
    );

    const gameDict = {};
    response.data.forEach((game) => {
      gameDict[game["g_title"]] = game["g_id"];
    });
    return gameDict;
  } catch (error) {
    console.error(error);
  }
};

// This method scrapes game-debate.com using a game's ID and returns the relevant system requirements information
const scrape = async (gameId) => {
  const url = "https://www.game-debate.com/games/index.php?g_id=";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on("request", (req) => {
    if (
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "font" ||
      req.resourceType() == "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  await page.goto(url + gameId);

  const sysReq = {};
  for (const element of Object.keys(elementWithPaths)) {
    sysReq[element] = await getPageElement(page, elementWithPaths[element]);
  }

  browser.close();

  return sysReq;
};

// This is a helper method that scrapes the text element of a given webpage and an object containing xpaths
const getPageElement = async (page, element) => {
  const getText = async (path) => {
    const [el] = await page.$x(path);
    const text = await el.getProperty("textContent");
    return await text.jsonValue();
  };

  try {
    return await getText(element.xPath);
  } catch {
    try {
      return await getText(element.fallBack1);
    } catch {
      try {
        return await getText(element.fallBack2);
      } catch {
        return {};
      }
    }
  }
};

// This method creates a new database and adds in games along with their system requirements
const createSysReqDB = async () => {
  const gameDict = await getGameDict();
  const db = new Datastore({ filename: "SysReqScraperAPI/SysReq.db", autoload: true });
  db.ensureIndex({ fieldName: "game", unique: true });

  let gamesInserted = 0;
  let failures = [];
  for (const game of Object.keys(gameDict)) {
    let sysReq = {};
    sysReq["game"] = game;

    try {
      sysReq = { ...sysReq, ...(await scrape(gameDict[game])) };
      db.insert(sysReq, function (err, doc) {
        console.log("Inserted", doc.game, "with ID", doc._id);
      });
      gamesInserted++;
    } catch (error) {
      failures.push(game);
      console.log(error);
      console.log(`Scraping failed for ${game}. Continuing on...`);
    }
  }

  console.log(`Total number of games: ${Object.keys(gameDict).length}`);
  console.log(`Total number of games inserted: ${gamesInserted}`);
  console.log(failures);
};

// This method adds new game entries to the database that don't yet exist
const updateDB = async () => {
  const gameDict = await getGameDict();
  const db = new Datastore({ filename: "SysReqScraperAPI/SysReq.db", autoload: true });
  db.ensureIndex({ fieldName: "game", unique: true });

  // Get the array of games that are not currently in the database
  let gamesToInsert = [];
  for (const game of Object.keys(gameDict)) {
    let findResult = await new Promise((resolve, reject) => {
      db.find({ game: game }, function (err, docs) {
        resolve(docs);
      });
    });

    if (findResult.length == 0) gamesToInsert.push(game);
  }

  // Insert games that are not in the database
  let gamesInserted = 0;
  let failures = [];
  for (const game of gamesToInsert) {
    let sysReq = {};
    sysReq["game"] = game;

    try {
      sysReq = { ...sysReq, ...(await scrape(gameDict[game])) };
      db.insert(sysReq, function (err, doc) {
        console.log("Inserted", doc.game, "with ID", doc._id);
      });
      gamesInserted++;
    } catch (error) {
      failures.push(game);
      console.log(error);
      console.log(`Scraping failed for ${game}. Continuing on...`);
    }
  }

  console.log(`Total number of games: ${Object.keys(gameDict).length}`);
  console.log(`Total number of games to be inserted: ${gamesToInsert.length}`);
  console.log(`Total number of games inserted: ${gamesInserted}`);
  console.log(failures);
};

exports.updateDB = updateDB;
