const massive = require('massive');

let db;

massive(process.env.CONNECTION_STRING)
    .then(dbInstance => {
        console.log('the server is sawing logs');
        db = dbInstance;
    })
    .catch(err => {
        console.warn('Failed to connect:');
        console.error(err);
    });

function getDb() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(Error('No database!'));
        }
        
        resolve(db);
    });
}

module.exports = {
    getDb,
};