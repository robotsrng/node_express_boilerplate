const { body } = require('express-validator');


const userSanitization = () => {
    return [
        body('title').trim(),
        body('content').trim(),
    ];
};

export default userSanitization;