import express from 'express'
import enableWs from 'express-ws'
const router = express.Router()
enableWs(router)

router.ws('/seed',   function(ws, req){ws.on('message', function(msg) {
    console.log(msg);
});
console.log('socket', req.testing);})


export default router