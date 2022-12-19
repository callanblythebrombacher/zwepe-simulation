import connector from '../connector';
const createPlayers = async (initialWalletValue) => {
    const db = await connector();
    await db.serialize(async () => {
        await db.run(
            'insert into player (wallet, total_winnings, total_losings) values (?, ?, ?)',
            [initialWalletValue, 0, 0],
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
    await db.close();
};

const clearDB = async () => {
    const db = await connector();
    await db.serialize(async () => {
        await db.run('delete from player;', [], (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
    await db.serialize(async () => {
        await db.run('delete from config;', [], (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
    await db.close();
};

const createConfig = async (data) => {
    const dataAsJson = JSON.stringify(data);
    const db = await connector();
    await db.serialize(async () => {
        await db.run(
            'insert into config (options) values (json(?));',
            [dataAsJson],
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
    await db.close();
};

export default {
    createPlayers,
    clearDB,
    createConfig,
};
