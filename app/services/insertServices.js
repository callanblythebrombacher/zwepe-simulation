import connector from "../database/connector";

const storeBets = async (bets) => {
    const {playerID, betValue, headsOrTails} = bets

    const db = await connector();
    await db.serialize(async () => {
        await db.run('insert into ledger (player_id, bet_total, bet_item) VALUES (?,?,?)', [playerID, betValue, headsOrTails], (err) => {
            if (err) {
                console.log(err);
            }else{
                return true
            }
        });
    });
};

export default {
    storeBets
}