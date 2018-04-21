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

module.exports = validateProduct;