import express from 'express';
import enableWs from 'express-ws';
import outCome from "../handlers/game";
import selectServices from "../services/selectServices";
const router = express.Router();
enableWs(router);

router.ws('/', function (ws, req) {
    let cnt = 0
    ws.on('message', async function (msg) {
        console.log('ran')
    const players = await selectServices.getPlayers().then(r=>{return r});
        const timeInterval = setInterval(  ()=>{
            cnt+=1
            outCome(players, cnt)
            ws.send(cnt)
            if(cnt === 100){
                console.log('cleared')
                clearInterval(timeInterval)
            }
        },3)
    });
});

export default router;
