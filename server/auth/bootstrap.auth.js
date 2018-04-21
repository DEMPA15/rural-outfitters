const passport = require('passport');

const { getDb } = require('../database/bootstrap.database');

const configurLogin = require('./login.auth');
const configureRegister = require('./register.auth');

configurLogin(passport);
configureRegister(passport);

// This isn't successfully implemented yet. Requires https
// passport.use(new FacebookStrategy({
//     passReqToCallback: true,
//     clientID: process.env.FB_APP_ID,
//     clientSecret: process.env.FB_APP_SECRET,
//     callbackURL: 'https://5cfefb3f.ngrok.io/login/facebook/callback',
// }, (req, accessToken, refreshToken, profile, done) => {
//     console.log(profile);
// }));

passport.serializeUser((user, done) => {
    if (!user) {
        done('No user');
    }
    
    done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
    getDb()
        .then(db => {
            db.user_table.findOne({ user_id: id })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    
                    delete user.password;
                    
                    done(null, user);
                })
                .catch(err => done(err));
        })
        .catch(err => done(Error('Internal Server Error')));
});

module.exports = passport;