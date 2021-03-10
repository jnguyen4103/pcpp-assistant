const puppeteer = require('puppeteer');
const axios = require('axios');

const games = ['Valorant', 'Stardew Valley', 'The Witcher III'];

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

const url = 'https://www.game-debate.com/games/index.php?g_id=';

async function scrape(gameId) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
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
    const idList = [];
    games.forEach((game) => {
        idList.push(dict[game]);
    });

    const sysReqList = [];
    for (const id of idList) {
        const sysReq = await scrape(id);
        sysReqList.push(sysReq);
    }

    return sysReqList;
}

(async () => {
    console.log(await getSysReqList(games));
})();
