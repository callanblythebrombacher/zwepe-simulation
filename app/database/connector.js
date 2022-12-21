import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

const connector =  () => {
    const db =  new sqlite.Database(
        process.cwd() + '/app/database/sqlite.db',
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.log(err, 'sql error:');
                db.close();
            }
        }
    );

    db.configure('busyTimeout', 5000)
    return db;
};

export default connector;
