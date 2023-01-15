const { body } = require('express-validator');


const authenticationValidation = () => {
    return [
        // username must be an email
        body('email').isString().isLength({ min: 3, max: 50 }),
        body('password').isString().isLength({ min: 1, max: 20 }),
    ];
};


export default authenticationValidation;