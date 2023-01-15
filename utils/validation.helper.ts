import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
    try{

        console.log("VALIDATE IN PROGRESS *************")
        
        const errors = validationResult(req);
        console.log("🚀 | file: validation.helper.ts:10 | validate | errors", errors);
        if (errors.isEmpty()) {
            return next();
        }
        const extractedErrors: Record<string, string>[] = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        console.log("🚀 | file: validation.helper.ts:15 | validate | extractedErrors", extractedErrors);
        
        return res.status(422).json({
            errors: extractedErrors,
        });
    }catch(e){
        console.log("VALIDATE ERROR *************")
        console.log(e)
    }
};

export { validate };