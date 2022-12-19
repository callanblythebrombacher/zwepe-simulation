import connector from "../database/connector";

const getPlayers = async ()=>{
    const db = await connector();
    let result;
    await db.serialize(async () => {
        await db.all(
            'select * from player;',
            [],
            (err, rows) => {
                if (err) {
                    console.log(err);
                }else{
                   result = rows
                }
            }
        );
    });
    await db.close();
    return result;
}

const getMinimumBet = async ()=>
{
    const db = await connector();
    let result;
    await db.serialize(async () => {
        await db.get(
            'select options from config',[], 
            (err, row)=>{
                if(err)
                {
                    console.log(err);
                }else 
                {
                    const options = JSON.parse(row.options)
                    const betValue1 = options.betValue1
                    const betValue2 = options.betValue2
                    const betValue3 = options.betValue3

                    const valueArray  = [betValue1, betValue2, betValue3]
                    result = (valueArray.sort((a, b)=>a - b))[0]
                }
            }
        );
        
    })
    return result
}


const getBets = async () => {
    const db = await connector();
    let result;
    await db.serialize(async () => {
        await db.get(
            'select options from config',[], 
            (err, row)=>{
                if(err)
                {
                    console.log(err);
                }else 
                {
                    const options = JSON.parse(row.options)
                    const betValue1 = options.betValue1
                    const betValue2 = options.betValue2
                    const betValue3 = options.betValue3

                    const valueArray  = [betValue1, betValue2, betValue3]
                    result = valueArray
                }
            }
        );
        
    })
    return result
}


export default {
    getPlayers, 
    getMinimumBet,
    getBets
}