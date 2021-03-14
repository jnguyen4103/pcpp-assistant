const puppeteer = require('puppeteer');
const axios = require('axios');
const Fuse = require('fuse.js');

async function getGameList() {
    try {
        const response = await axios.get(
            'https://www.game-debate.com/game/api/list'
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getGameDict() {
    const gameList = await getGameList();
    const gameDict = {};
    gameList.forEach((game) => {
        gameDict[game['g_title']] = game['g_id'];
    });
    return gameDict;
}

async function scrape(gameId) {
    const url = 'https://www.game-debate.com/games/index.php?g_id=';
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if (
            req.resourceType() == 'stylesheet' ||
            req.resourceType() == 'font' ||
            req.resourceType() == 'image'
        ) {
            req.abort();
        } else {
            req.continue();
        }
    });
    await page.goto(url + gameId);

    const [el1] = await page.$x(
        '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[1]/div[1]/div[1]/a'
    );
    const text1 = await el1.getProperty('textContent');
    const intelCpu = await text1.jsonValue();

    const [el2] = await page.$x(
        '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[1]/div[1]/div[2]/a'
    );
    const text2 = await el2.getProperty('textContent');
    const amdCpu = await text2.jsonValue();

    const [el3] = await page.$x(
        '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[2]/div[1]/div[1]/a'
    );
    const text3 = await el3.getProperty('textContent');
    const nvidiaGpu = await text3.jsonValue();

    const [el4] = await page.$x(
        '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[2]/div[1]/div[2]/a'
    );
    const text4 = await el4.getProperty('textContent');
    const amdGpu = await text4.jsonValue();

    const [el5] = await page.$x(
        '//*[@id="sys-req-mobile-container"]/div[2]/div/div[4]/div[4]/div[1]/span'
    );
    const text5 = await el5.getProperty('textContent');
    const memory = await text5.jsonValue();

    browser.close();

    return { intelCpu, amdCpu, nvidiaGpu, amdGpu, memory };
}

async function getSysReqList(games) {
    const dict = await getGameDict();
    const gameList = Object.keys(dict);

    const options = {
        includeScore: true,
    };
    const fuse = new Fuse(gameList, options);

    const idList = [];
    games.forEach((game) => {
        const searchResult = fuse.search(game);
        searchResult.length > 0
            ? idList.push(dict[searchResult[0]['item']])
            : console.log('No result for', game);
    });

    const sysReqList = [];
    idList.map((id) => {
        const sysReq = scrape(id);
        sysReqList.push(sysReq);
    });

    return await Promise.all(sysReqList);
}

async function fetchSysReqList(games) {
    console.log(await getSysReqList(games));
}

module.exports = fetchSysReqList;
