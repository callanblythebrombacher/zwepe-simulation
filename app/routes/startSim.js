import express from 'express';
import enableWs from 'express-ws';
const router = express.Router();
enableWs(router);

router.ws('/', async function (ws, req) {
    await ws.on('message', async function (msg) {
        for (let i = 0; i < 100; i++) {
            await outCome();
            ws.send(i);
        }
    });
});

export default router;
