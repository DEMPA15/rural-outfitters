const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config();
const app = express();
massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('the server is sawing logs')
        app.set('db', db)
    })
app.use(cors());
app.use(bodyParser.json());





const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('this port is awesome', port)
})
