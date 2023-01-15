const { body } = require('express-validator');


const projectSanitization = () => {
    return [
        body('title').trim(),
        body('content').trim(),
    ];
};

export default projectSanitization;