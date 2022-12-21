import connector from '../database/connector';

const storeBets = async (bets) => {
    const { playerID, betValue, headsOrTails } = bets;

    const db = await connector();
    await db.serialize(async () => {
        await db.run(
            'insert into ledger (player_id, bet_total, bet_item) VALUES (?,?,?)',
            [playerID, betValue, headsOrTails],
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    return true;
                }
            }
        );
    });
    db.close()
};

const storeBetResults = async (betResults) => 
{
    const { flipResult, totalLosings, totalWinnings, houseTotal } = betResults;

    const db = await connector();

    await db.serialize(async () => 
    {
        await db.run(
            'insert into bets(heads_or_tails,total_losings,total_winnings,house_winnings) VALUES (?,?,?,?)',
            [flipResult, totalLosings, totalWinnings, houseTotal],
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    return true;
                }
            }
        );
    });
    db.close()
};

export default {
    storeBets,
    storeBetResults,
};
