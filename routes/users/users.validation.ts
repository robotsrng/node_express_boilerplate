const { body } = require('express-validator');


const userValidation = () => {
    return [
        body('first_name').isString().isLength({ min: 3, max: 50 }),
        body('last_name').isString().isLength({ min: 3, max: 500 }),
        body('email').isEmail()
    ];
};


export default userValidation;