const express = require('express');

const passport = require('../auth/bootstrap.auth');

const AuthRouter = express.Router();

AuthRouter.post('/login', passport.authenticate(['login']), (req, res) => {
    res.send({
        message: 'Welcome to the Jungle!',
        user: req.user,
    });
});

AuthRouter.post('/register', passport.authenticate('register'), (req, res) => {
    res.send({
        message: 'Success!',
        user: req.user,
    });
});

module.exports = AuthRouter;