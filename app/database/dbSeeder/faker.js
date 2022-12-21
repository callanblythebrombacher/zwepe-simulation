import connector from '../connector';

const createPlayers = (initialWalletValue) => {
    const db = new connector();
    db.serialize(()=> {
        db.run(
            'insert into player (wallet, total_winnings, total_losings) values (?, ?, ?)',
            [initialWalletValue, 0, 0],
            async (err) => {
                if (err) {
                    console.log(err);
                }
            }
        )
    })
    db.close( (err) =>{ if(err) console.log(err);});
};

const clearDB =  () => {
    const db =new connector();
    db.serialize( () => {
        db.run('delete from player;', [], (err) => {
            if (err) {
                console.log(err);
            }
        }).run('delete from config;', [], (err) => {
            if (err) {
                console.log(err);
            }
        })
    });
    db.close( (err) =>{ if(err) console.log(err);});
};

const createConfig =  (data) => {
    const dataAsJson = JSON.stringify(data);
    const db = new connector();
    db.serialize( () => {
        db.run(
            'insert into config (options) values (json(?));',
            [dataAsJson],
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        )
    });
    db.close( (err) =>{ if(err) console.log(err);});
};

export default {
    createPlayers,
    clearDB,
    createConfig,
};
