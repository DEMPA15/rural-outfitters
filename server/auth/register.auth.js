const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function configureRegister(passport) {
    passport.use('register', new LocalStrategy({
        usernameField: 'email', // req.body.email != req.body.username
        passReqToCallback: true,
    }, (req, email, password, done) => {
        if (!email || !password) {
            return done('Email and password are required');
        }
        
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(15));
        
        req.db.user_table.insert({ email, password })
            .then(user => {
                delete user.password;
                
                done(null, user);
            })
            .catch(err => done(err));
    }));
}

module.exports = configureRegister;