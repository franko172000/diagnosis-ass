const {check} = require('express-validator');
module.exports = ValidationRules = {
    auth: {
        token: [
            check('email', 'Email field cannot be empty').isLength({min: 1}),
            check('email', 'Invalid email address provided').isEmail(),
        ],
    },
    diagnosis: {
        getOne: [
            check('code', 'Please supply diagnosis code').isLength({min: 1}),
        ],
        delete: [
            check('code', 'Please supply diagnosis code').isLength({min: 1}),
        ],
        create: [
            check('category', 'please supply category').isLength({min: 1}),
            check('full_description', 'please supply full description').isLength({min: 1}),
            check('partial_description', 'please supply partial description').isLength({min: 1}),
        ],
        update: [
            check('category', 'please supply category').isLength({min: 1}),
            check('full_description', 'please supply full description').isLength({min: 1}),
            check('full_code', 'Please supply diagnosis code').isLength({min: 1}),
            check('partial_description', 'please supply partial description').isLength({min: 1}),
        ],
    },
    category: {
        required: [
            check('code', 'Please supply category code').isLength({min: 1}),
            check('name', 'Please supply category name').isLength({min: 1}),
        ],
        requiredOne: [
            check('code', 'Please supply category code').isLength({min: 1}),
        ],
    },
};
