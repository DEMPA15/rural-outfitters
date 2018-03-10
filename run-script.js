const massive = require('massive');

require('dotenv').config();

massive(process.env.CONNECTION_STRING)
    .then(db => db.setup.get_columns({ name: 'product' }))
    .then(result => console.log(result))
    .catch(err => console.error(err));