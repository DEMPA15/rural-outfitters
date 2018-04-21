const express = require('express');

const validateProduct = require('../middleware/validateProduct.middleware');
const handleDbError = require('../database/handleError.database');

const ItemRouter = express.Router();

ItemRouter.get('/', (req, res) => {
    req.db.product.find()
        .then(products => {
            res.send(products);
        })
        .catch(handleDbError(res));        
});

ItemRouter.post('/', validateProduct(), (req, res) => {
    req.db.product.insert(req.body)
        .then(product => {
            res.send(product);
        })
        .catch(handleDbError(res));
});

ItemRouter.patch('/:id', validateProduct(), (req, res) => {
    req.db.product.update(req.body)
        .then(product => {
            res.send(product);
        })
        .catch(handleDbError(res));
});

ItemRouter.get('/:id', (req, res) => {
    req.db.product.find({ id: req.params.id })
        .then(product => {
            res.send(product);
        })
        .catch(handleDbError(res));
});

module.exports = ItemRouter;