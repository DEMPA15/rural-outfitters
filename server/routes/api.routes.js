const express = require('express');

const ItemRouter = require('./item.routes');
const handleDbError = require('../database/handleError.database');

const ApiRouter = express.Router();

ApiRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    
    res.status(401).send({ message: 'Not allowed to access' });
});

ApiRouter.use('/items', ItemRouter);

ApiRouter.get('/basket', (req, res) => {
    req.db.basket.find({ userId:req.session.user })
        .then(basket => {
            res.send(basket
                .map(p => {
                    return Object.keys(p)
                        .reduce((item, k) => {
                            const isProduct = k.includes('product');
                            
                            if (isProduct) {
                                const { product } = item;
                                
                                return {
                                    ...item,
                                    product: {
                                        ...product,
                                        [k.split('_').slice(1).join('_')]: p[k],
                                    },
                                };
                            }
                            
                            const value = p[k] instanceof Date ?
                                `${
                                    p[k].getFullYear()
                                }-${
                                    p[k].getMonth() < 9 ? '0' : ''}${p[k].getMonth() + 1
                                }-${
                                    p[k].getDate() < 10 ? '0' + p[k].getDate() : p[k].getDate()
                                }` :
                                p[k];
                            
                            return {
                                ...item,
                                [k]: value,
                            };
                        }, { product: {} });
                })
            );
        })
        .catch(handleDbError(res));
});

ApiRouter.post('/basket', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    const userId = req.session.user;
    
    req.db.basket.findByProductId({ userId, productId })
        .then(products => {
            if (products.length) {
                const [ product ] = products;
                
                return req.db.basket.update({
                    userId,
                    productId: product.product_id,
                    quantity: product.quantity + quantity,
                });
            }
            
            return req.db.basket.insert({
                userId,
                productId,
                quantity,
                date:  new Date(),
            });
        })
        .then(() => req.db.basket.getBasketCount({ userId }))
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});

ApiRouter.delete('/basket/:productId', (req, res) => {
    const { productId } = req.params;
    
    const userId = req.session.user;
    
    req.db.basket.deleteItem({ userId, productId })
        .then(() => req.db.basket.getBasketCount({ userId }))
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});

ApiRouter.get('/basket-count', (req, res) => {
    const userId = req.session.user;
    
    req.db.basket.getBasketCount({ userId })
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});

ApiRouter.patch('/basket/:productId', (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.session.user;
    
    req.db.basket.update({ quantity, productId, userId })
        .then(() => req.db.basket.getBasketCount({ userId }))
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});

module.exports = ApiRouter;