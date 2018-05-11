const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
module.exports = {
    app: app
}
const authenticate =  require('./server/authenticationController.js')
const middleware = require('./server/middleWare');
const item = require('./server/itemController');
const basket = require('./server/basketController')
massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('the server is sawing logs');
        app.set('db', db);
    })
    .catch(err => {
        console.warn('Failed to connect:');
        console.error(err);
    });

passport.use('login', new LocalStrategy({
    usernameField: 'email', // req.body.email != req.body.username
    passReqToCallback: true,
}, authenticate.login));

passport.use('register', new LocalStrategy({
    usernameField: 'email', // req.body.email != req.body.username
    passReqToCallback: true,
}, authenticate.register));

passport.serializeUser(authenticate.serialize);

passport.deserializeUser(authenticate.deserialize);


app.use(cors());
app.use(bodyParser.json());
app.use(session({
    name: 'rural-outfitters',
    secret: process.env.SESSION_SECRET, // {userId: 1} => apowienpafosdihvpoaiwnpeiruhpasokmv287394erijf
                                        // apowienpafosdihvpoaiwnpeiruhpasokmv287394erijf => {userId: 1}
    cookie: {
        //days hours minutes seconds milseconds
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(middleware.checkDb(app));




//#region routes

//////////// login endpoints //////////////
app.post('/api/login', passport.authenticate(['login']), authenticate.loginEndpoint);

app.post('/api/register', passport.authenticate('register'), authenticate.registerEndpoint);

//////////// item endpoints //////////////
app.get('/api/items', item.getProducts);

app.post('/api/items', middleware.validateProduct(), item.insertProduct);

app.patch('/api/items/:id', middleware.validateProduct(), item.updateProduct);

app.get('/api/items/:id', item.getProduct);

//////////// basket endpoints //////////////
app.get('/api/basket', basket.getBasket);

app.post('/api/basket',basket.addToBasket);

app.delete('/api/basket/:productId', basket.removeProductFromBasket);

app.get('/api/basket-count', basket.getBasketCount);

app.patch('/api/basket/:productId', basket.updateProductQuanity);



const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('this port is awesome', port)
});


