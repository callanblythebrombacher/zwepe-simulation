import express from 'express';
import enableWs from 'express-ws';
import outCome from "../handlers/game";
const router = express.Router();
enableWs(router);

router.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        for (let i = 0; i <= 100; i++) {
            Promise.resolve(outCome()) ;
            ws.send(i);
        }
    });
});

export default router;
