import express from 'express';
import enableWs from 'express-ws';
import faker from '../database/dbSeeder/faker';
const router = express.Router();
enableWs(router);

router.delete('/clearDB',  (req, res) =>
{
    faker.clearDB();
    res.status(200).send('db cleared');
});

router.ws('/',  function (ws, req)
{

    let cnt = 0
     ws.on('message',  function (msg) {
        const seedData = JSON.parse(msg);
        console.log('seed data:', seedData);
        if (
            seedData?.walletBalance &&
            seedData?.numberOfPlayers &&
            seedData?.betValues
        ) {
            const numberOfPlayers = seedData.numberOfPlayers;
            const configData = seedData.betValues;
            console.log('config data', configData);
            console.log('config data type:', typeof configData);

            const timeInterval = setInterval(()=> {
                cnt += 1
                console.log(cnt)
                faker.createPlayers(seedData.walletBalance)
                const percentSeed = (cnt / numberOfPlayers) * 100;
                ws.send(Math.ceil(percentSeed));
                if(cnt  === parseInt(numberOfPlayers)) {
                    clearInterval(timeInterval)
                }
                }, 3)
            faker.createConfig(configData);
        } else {
            ws.send('missing data in msg');
        }
    });
});

export default router;
