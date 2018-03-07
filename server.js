const path = require('path');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config();
const app = express();

massive(process.env.CONNECTION_STRING)
    .then((db) => {
        console.log('the server is sawing logs')
        app.set('db', db)
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

function checkDb() {
    return (req, res, next) => {
        const db = app.get(`db`);

        if (db) {
            req.db = db;
            next();
        } else {
            res.status(500).send({
                message: 'this died'
            })
        }
    }
}

app.use(checkDb);

app.get(`/api/items`, (req, res) => {
    req.db.product.find()
        .then(products => {
            res.send(products);
        })
        .catch(handleDbError(res));
})

app.post('/api/items', validateProduct(), (req, res) => {
    req.db.product.insert(req.body)
        .then(products => {
            res.send(products);
        })
        .catch((handleDbError(res)))
});

app.get(`/api/items/:id`, (req, res) => {
    req.db.product.find({
            id: req.params.id
        })
        .then(products => {
            res.send(product)
        })
        .catch(handleDbError(res));
})

function validateProduct() {
    return (req, res, next) => {
        if (!req.body.price || typeof req.body.price != 'number' || req.body.price <= 0) {
            return res.status(422).send({
                message: 'validation failed, price must exist and be a positive number'
            })
        } else if (req.body.name) {

        } else if (req.body.price) {

        } else if (req.body.description) {

        } else if (req.body.img) {

        } else if (req.body.specs) {

        }
    };
}

function handleDbError(res) {
    return (err) => {
        console.log('hit a snag');
        console.error(err);
        if (err.code == 'ECONNRESET') {
            res.status(500).send({
                message: 'something died again'
            });
        }
    }
}

const port = process.env.PORT || 5000;
app.listen(port,()=> {
    console.log('this port is awesome', port)
})