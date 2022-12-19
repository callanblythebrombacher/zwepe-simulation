import express from 'express'
const app = express()
import dotenv from 'dotenv'
import seedRouter from './routes/seed'
let port;
let host;
if(process.env.NODE_ENV='development') {
    dotenv.config({path: process.cwd() + '/.env.dev'})
    port=process.env.PORT
    host=process.env.HOST

}else if(process.env.NODE_ENV='production'){
    dotenv.config({path: process.cwd() + '/.env.prod'})
    port=process.env.PORT
}


app.get('/', (req, res)=>{
    res.status(200).send('simulation started')
})

app.use('/seed', seedRouter)

app.listen(port, function (){
    console.log('listening on port: ' + port)
} )

