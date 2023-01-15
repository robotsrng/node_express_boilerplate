import { Request, Response } from 'express';
import { NextFunction } from "express";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        console.log("🚀 | file: authentication.middleware.ts:7 | isAuthenticated | req.session", req.session);
        next();
    }
    else {
        console.log("🚀 | file: authentication.middleware.ts:11111| isAuthenticated | req.session", req.session);
        res.status(401).send({ message: "Not authorized" });
    };
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    }
    else {
        throw new Error("Not authorized");
    };
}


export { isAuthenticated, isAdmin };