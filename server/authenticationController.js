const bcrypt = require('bcrypt');
const {app} = require('../server')
module.exports= {
   login:(req, email, password, done) => {
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
    },
    register: (req, email, password, done) => {
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
    },
    serialize: (user, done) => {
        if (!user) {
            done('No user');
        }
        
        done(null, user.user_id);
    },
    deserialize:(id, done) => {
        const db = app.get('db');
        
        if (!db) {
            return done('Internal Server Error');
        }
        
        db.user_table.findOne({ user_id: id })
            .then(user => {
                if (!user) {
                    return done(null, false);
                }
                
                delete user.password;
                
                done(null, user);
            })
            .catch(err => done(err));
    },
    loginEndpoint: (req, res) => {
        res.send({
            message: 'Welcome to the Jungle!',
            user: req.user,
            success: true,
        });
    },
    registerEndpoint:(req, res) => {
        res.send({
            message: 'Success!',
            user: req.user,
            success: true,
        })
    }
}