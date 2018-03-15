const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');

require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('the server is sawing logs');
        app.set('db', db);
    })
    .catch(err => {
        console.warn('Failed to connect:');
        console.error(err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    name: 'rural-outfitters',
    secret: process.env.SESSION_SECRET, // {userId: 1} => apowienpafosdihvpoaiwnpeiruhpasokmv287394erijf
                                        // apowienpafosdihvpoaiwnpeiruhpasokmv287394erijf => {userId: 1}
    cookie: {
        expires: 604800,
    },
    rolling: true,
    resave: false,
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(checkDb());


//#region alternative solution
// app.use((req, res, next) => {
//     const db = app.get('db');
    
//     if (db) {
//         req.db = db;
//         next();
//     }
//     else {
//         res.status(500).send({ message: 'this died' });
//     }
// });
//#endregion


//#region routes
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    req.db.user_table.findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.status(401).send({ message: 'Invalid username or password' });
            }
            
            res.send({ success: true, message: 'Logged in successfully' });
        })
        .catch(handleDbError(res));
});

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    
    req.db.user_table.insert({ email, password })
        .then(user => {
            req.session.user = user.id;
            res.send({ success: true, message: 'logged in successfully' });
        })
        .catch(handleDbError(res));
});

app.get('/api/items', (req, res) => {
    req.db.product.find()
        .then(products => {
            res.send(products);
        })
        .catch(handleDbError(res));        
});

app.post('/api/items', validateProduct(), (req, res) => {
    req.db.product.insert(req.body)
        .then(product => {
            res.send(product);
        })
        .catch(handleDbError(res));
});

app.patch('/api/items/:id', validateProduct(), (req, res) => {
    req.db.product.update(req.body)
        .then(product => {
            res.send(product);
        })
        .catch(handleDbError(res));
});

app.get('/api/items/:id', (req, res) => {
    req.db.product.find({ id: req.params.id })
        .then(product => {
            res.send(product);
        })
        .catch(handleDbError(res));
});

app.get('/api/basket', (req, res) => {
    const userId = 1;
    
    req.db.basket.find({ userId })
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

app.post('/api/basket', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    const userId = 1;
    
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

app.delete('/api/basket/:productId', (req, res) => {
    const { productId } = req.params;
    
    const userId = 1;
    
    req.db.basket.deleteItem({ userId, productId })
        .then(() => req.db.basket.getBasketCount({ userId }))
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});

app.get('/api/basket-count', (req, res) => {
    const userId = 1;
    
    req.db.basket.getBasketCount({ userId })
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});

app.patch('/api/basket/:productId', (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = 1;
    
    req.db.basket.update({ quantity, productId, userId })
        .then(() => req.db.basket.getBasketCount({ userId }))
        .then(([ count ]) => res.send(count))
        .catch(handleDbError(res));
});
//#endregion routes


//#region start listening


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('this port is awesome', port)
});

//#endregion


//#region define middleware
function validateProduct() {
    return (req, res, next) => {
        if (!req.body.price || typeof req.body.price != 'number' || req.body.price <= 0) {
            return res.status(422).send({ message: 'validation failed, price must exist and be a positive number' });
        }
        else if (req.body.name) {
            
        }
        else if (req.body.description) {
            
        }
        else if (req.body.img) {
            
        }
        else if (req.body.specs) {
            
        }
    };
}

function checkDb() {
    return (req, res, next) => {
        const db = app.get('db');
        
        if (db) {
            req.db = db;
            next();
        }
        else {
            res.status(500).send({ message: 'this died' });
        }
    };
}
//#endregion define middleware

//#region error handlers
function handleDbError(res) {
    return (err) => {
        console.warn('hit a snag');
        console.error(err);
        
        if (err.code == 'ECONNRESET') {
            return res.status(500).send({ message: 'something died again' });
        }
        if (err.code == '22P02') {
            res.status(422).send({ message: 'The request had incorrect or missing properties: ' + err.message });
        }
        res.status(500).send({ message: 'Internal Server Error' })
    };
}
//#endregion error handlers
