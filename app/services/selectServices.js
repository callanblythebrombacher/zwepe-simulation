import connector from '../database/connector';
import handlerFunctions from "../handlers/handlerFunctions";

const getPlayers = async () => {
    const db = await connector();
    let result;
    await db.serialize(async () => {
        await db.all('select * from player;', [], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                result = rows;
            }
        });
    });
    await db.close();
    return result;
};

const getMinimumBet = async () => {
    const db = await connector();
    let result;
    await db.serialize(async () => {
        await db.get('select options from config', [], (err, row) => {
            if (err) {
                console.log(err);
            } else {
                const options = JSON.parse(row.options);
                const betValue1 = options.betValue1;
                const betValue2 = options.betValue2;
                const betValue3 = options.betValue3;

                const valueArray = [betValue1, betValue2, betValue3];
                result = valueArray.sort((a, b) => a - b)[0];
            }
        });
    });
    return result;
};

const getBets = async () => {
    const db = await connector();
    let result;
    await db.serialize(async () => {
        await db.get('select options from config', [], (err, row) => {
            if (err) {
                console.log(err);
            } else {
                const options = JSON.parse(row.options);
                const betValue1 = parseInt(options.betValue1);
                const betValue2 = parseInt(options.betValue2);
                const betValue3 = parseInt(options.betValue3);

                const valueArray = [betValue1, betValue2, betValue3];
                result = valueArray;
            }
        });
    });
    return result;
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
