const dotenv = require('dotenv');
const fs = require('fs');
const request = require('request-promise-native');
dotenv.config();

const dirName = process.env.DIRNAME;
const apiToken = process.env.UPLOAD_TOKEN;

(async () => {
    if (apiToken.substr(0,5) !== 'xoxs-') {
        throw Error('Use token starting with "xoxs-"');
    }

    const images = fs.readdirSync(dirName);
    for (let imgFile of images) {
        try {
            const img = fs.createReadStream(`${dirName}/${imgFile}`);

            await request.post({
                url: 'https://api.slack.com/api/emoji.getInfo',
                formData: {
                   token: apiToken,
                   name: imgFile.split('.')[0],
                },             
            }).then(res => JSON.parse(res)).then(res => {
                if (res.ok) throw `${imgFile.split('.')[0]} already exists`;
            });
    
            const res = await request.post({
                url: 'https://api.slack.com/api/emoji.add',
                formData: {
                   token: apiToken,
                   mode: 'data',
                   name: imgFile.split('.')[0],
                   image: img,
                },
            });
            const json = JSON.parse(res);
            if (!json.ok) throw `${imgFile.split('.')[0]}: ${json.error}`;
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }
})();