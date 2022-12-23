import connector from '../database/connector';
import handlerFunctions from "../handlers/handlerFunctions";

const getPlayers = () => {
    const db = connector();
    return new Promise((resolve, reject) => {
        db.serialize(async () => {
            await db.all('select * from player', [], (err, rows) => {
                if (err) {
                    console.log('sqliteError: ', err);
                    reject(err)
                } else {
                    db.close();
                    resolve(rows)
                }
            });
        });
    });
};

const getMinimumBet = async () => {
    const db = await connector();
    return new Promise((resolve, reject) =>{
     db.serialize(async () => {
        await db.get('select options from config', [], (err, row) => {
            if (err) {
                console.log( 'sqliteError',err);
                reject(err)
            } else
            {
                const options = JSON.parse(row.options);
                const betValue1 = options.betValue1;
                const betValue2 = options.betValue2;
                const betValue3 = options.betValue3;

                const valueArray = [betValue1, betValue2, betValue3];
                db.close()
               resolve(valueArray.sort((a, b) => a - b)[0]);
            }
        });
    });
    });
};

const getBets = async () => {
    const db = await connector();
    return new Promise((resolve,reject) =>
    {
     db.serialize(async () => {
        await db.get('select options from config', [], (err, row) => {
            if (err) {
                console.log('sqliteError',err);
                reject(err)
            } else {
                const options = JSON.parse(row.options);
                const betValue1 = parseInt(options.betValue1);
                const betValue2 = parseInt(options.betValue2);
                const betValue3 = parseInt(options.betValue3);

                const valueArray = [betValue1, betValue2, betValue3];
                db.close()
                resolve(valueArray);
            }
        });
    });

    });


};

const getTotalWinnings = async (betItem, totalLosings, housePercentage) => {
    const db = await connector();
    let result= 0;
    await db.serialize(async () => {
        await db.each('select bet_total, bet_item from ledger limit (select count(id) from player) order by id desc', [], (err, row) => {
            if (err) {
                console.log(err);
            } else {
                if(betItem === row.bet_item) {
                    result += row.bet_total;
                }
            }
        });
    });
    await db.close()
    return result + (totalLosings -handlerFunctions.getHouseTotal(totalLosings, housePercentage));
};

const getTotalLosings = async (betItem) => {
    const db = await connector();
    let result= 0;
    await db.serialize(async () => {
        await db.each('select bet_total, bet_item from ledger limit (select count(id) from player) order by id desc', [], (err, row) => {
            if (err) {
                console.log(err);
            } else {
                if(betItem !== row.bet_item) {
                    result += row.bet_total;
                }
            }
        });
    });
    await db.close()
    return result;
};

const getConfig = async () =>{
    const db = await connector();
    let result= 0;
    await db.serialize(async () => {
        await db.get('select options from config', [], (err, row) => {
            if (err) {
                console.log(err);
            } else {
               result = row.options
            }
        });
    });
    await db.close()
    return result;
}


export default 
{
    getPlayers,
    getMinimumBet,
    getBets,
    getTotalWinnings,
    getTotalLosings,
    getConfig
};
