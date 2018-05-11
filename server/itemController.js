const middleware = require('./middleWare')
module.exports = {
    getProducts: (req, res) => {
        req.db.product.find()
            .then(products => {
                res.send(products);
            })
            .catch(middleware.handleDbError(res));        
    },
    insertProduct:(req, res) => {
        req.db.product.insert(req.body)
            .then(product => {
                res.send(product);
            })
            .catch(middleware.handleDbError(res));
    },
    updateProduct:(req, res) => {
        req.db.product.update(req.body)
            .then(product => {
                res.send(product);
            })
            .catch(middleware.handleDbError(res));
    },
    getProduct:(req, res) => {
        req.db.product.find({ id: req.params.id })
            .then(product => {
                res.send(product);
            })
            .catch(middleware.handleDbError(res));
    }

}