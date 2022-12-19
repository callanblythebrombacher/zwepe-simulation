import express from 'express';
import enableWs from 'express-ws';
import faker from '../database/dbSeeder/faker';
const router = express.Router();
enableWs(router);

router.ws('/', function (ws, req) {
    ws.on('message', async function (msg) {
        const seedData = JSON.parse(msg);
        console.log(seedData, 'seed data:');
        if (seedData?.walletBalance && seedData?.numberOfPlayers) {
            const numberOfPlayers = seedData.numberOfPlayers;
            await faker.clearPlayers();
            for (let i = 0; i < numberOfPlayers; i++) {
                await faker.createPlayers(seedData.walletBalance);
                const percentSeed = (i / numberOfPlayers) * 100;
                ws.send(Math.ceil(percentSeed));
            }
        }
    });
    console.log('socket', req.testing);
});

export default router;
