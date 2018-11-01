const dotenv = require('dotenv');
const fs = require('fs');
const request = require('request-promise-native');
dotenv.config();

const dirName = process.env.DIRNAME;
const apiToken = process.env.DOWNLOAD_SLACK_TOKEN;

(async () => {
    try {
        const res = await request.post({
            url: 'https://slack.com/api/emoji.list',
            form: {
                token: apiToken,
            },
        });
        const json = JSON.parse(res);
        if (!fs.existsSync(dirName)) fs.mkdirSync(dirName);
        Object.keys(json.emoji).forEach(key => {
            const url = json.emoji[key];
            //エイリアスは無視
            if (url.match(/alias/)) {
                return;
            }
            console.log(`start ${key}`);
            request.get({
                url, 
                encoding: null}
            ).then(res => res).then(res => {
                fs.writeFileSync(`${dirName}/${key}.png`, res);
                console.log(`end ${key}`);
            }).catch(e => {
                console.error(`Error(get): ${e}`);        
            });
        });
    } catch (e) {
        console.error(`Error: ${e}`);
        return;
    }
})();