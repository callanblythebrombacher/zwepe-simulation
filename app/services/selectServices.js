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


export default {
    getPlayers
}