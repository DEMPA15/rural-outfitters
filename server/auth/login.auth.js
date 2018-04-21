const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function configureLogin(passport) {
    passport.use('login', new LocalStrategy({
        usernameField: 'email', // req.body.email != req.body.username
        passReqToCallback: true,
    }, (req, email, password, done) => {
        req.db.user_table.findOne({ email })
            .then(user => {
                if (!user || !bcrypt.compareSync(password, user.password)) {
                    return done('Invalid email or password');
                }
                
                delete user.password;
                
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    }));
    
    return passport;
}

module.exports = configureLogin;