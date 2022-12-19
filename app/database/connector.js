import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

const connector = async () => {
    const db = await new sqlite.Database(
        process.cwd() + '/app/database/sqlite.db',
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.log(err, 'sql error:');
                db.close();
            }
        }
    );

    return db;
};

export default connector;
