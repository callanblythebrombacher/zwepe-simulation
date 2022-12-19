import express from 'express';
import enableWs from 'express-ws';
import faker from '../database/dbSeeder/faker';
const router = express.Router();
enableWs(router);

router.delete('/clearDB', async (req, res) => {
    await faker.clearDB();
    res.status(200).send('db cleared');
});

router.ws('/', async function (ws, req) {
    await ws.on('message', async function (msg) {
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

            for (let i = 0; i < numberOfPlayers; i++) {
                await faker.createPlayers(seedData.walletBalance);
                const percentSeed = (i / numberOfPlayers) * 100;
                ws.send(Math.ceil(percentSeed));
            }
            await faker.createConfig(configData);
        } else {
            ws.send('missing data in msg');
        }
    });
});

export default router;
