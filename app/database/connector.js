import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await
const connector  = async () => {
    // open the database
    const db = await open({
        filename: './sqlite.db',
        driver: sqlite3.Database
    })

    return db
}

export default connector()