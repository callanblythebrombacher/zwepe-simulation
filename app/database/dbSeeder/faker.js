import connector from '../connector';
const createPlayers = async (initialWalletValue) => {
    const db = await connector();
    await db.serialize(async () => {
        await db.run(
            'insert into player (wallet, total_winnings, total_losings) values (?, ?, ?)',
            [initialWalletValue, 0, 0]
        );
    });
    db.close();
};

const clearPlayers = async (initialWalletValue) => {
    const db = await connector();
    await db.serialize(async () => {
        await db.run('delete from player;');
    });
    db.close();
};

export default {
    createPlayers,
    clearPlayers,
};
