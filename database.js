// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Forbundet til SQLite-databasen.');

    db.run("CREATE TABLE IF NOT EXISTS packages (id INTEGER PRIMARY KEY AUTOINCREMENT, sender_address TEXT, receiver_address TEXT, package_size TEXT, weight INTEGER)");
});

module.exports = db;
