const middleware = require('./middleWare')
module.exports = {
    getBasket: (req, res) => {
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
            .catch(middleware.handleDbError(res));
    },
    addToBasket: (req, res) => {
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
            .catch(middleware.handleDbError(res));
    },
    removeProductFromBasket:(req, res) => {
        const { productId } = req.params;
        
        const userId = req.session.user;
        
        req.db.basket.deleteItem({ userId, productId })
            .then(() => req.db.basket.getBasketCount({ userId }))
            .then(([ count ]) => res.send(count))
            .catch(middleware.handleDbError(res));
    },
    getBasketCount: (req, res) => {
        const userId = req.session.user;
        
        req.db.basket.getBasketCount({ userId })
            .then(([ count ]) => res.send(count))
            .catch(middleware.handleDbError(res));
    },
    updateProductQuanity: (req, res) => {
        const { quantity } = req.body;
        const { productId } = req.params;
        const userId = req.session.user;
        
        req.db.basket.update({ quantity, productId, userId })
            .then(() => req.db.basket.getBasketCount({ userId }))
            .then(([ count ]) => res.send(count))
            .catch(handleDbError(res));
    }
}