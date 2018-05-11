module.exports = {
    checkDb:(app) => {
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
    },
    handleDbError: (err) => {
        console.log(err);
    },
    handleError: (res) => {
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
    },
    validateProduct: () => {
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
        }
    }
}