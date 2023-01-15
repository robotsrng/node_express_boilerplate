const { body } = require('express-validator');


const projectValidation = () => {
    return [
        // username must be an email
        body('title').isString().isLength({ min: 3, max: 50 }),
        body('content').isString().isLength({ min: 3, max: 500 }),
    ];
};


export default projectValidation;