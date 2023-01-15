import { Request, Response } from 'express';
import db from '../../utils/db/db';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { logoutUser } from '../../services/authentication';

// TODO Extract password functions to separate classes
export function requestSignup(req: Request, res: Response) {
    const { email, password } = req.body;
    // Define salt rounds
    const saltRounds = 10;
    // Hash password
    return bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw new Error("Internal Server Error");
        return db.user.create({ data: { email: email, password: hash } }).then((newUser: User) => {
            res.json(newUser);
        });
    });

}

export function requestLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    return db.user.findUnique({ where: { email } }).then((user: User | null) => {
        if (!user) throw new Error("User not found");
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw new Error("Internal Server Error");
            if (result) {
                req.session.regenerate(function (err) {
                    if (err) throw new Error("Error with session generation");

                    req.session.user = user;

                    req.session.save(function (err) {
                        if (err) throw new Error("Error saving session");
                        res.json(user);
                    });
                });
            } else {
                throw new Error("Wrong password");
            }
        });
    });
}

export function requestLogout(req: Request, res: Response) {
    logoutUser(req);
    res.json({ message: "Logged out" });
}


export function requestCurrentUser(req: Request, res: Response) {
    const user = req.session.user;
    if (!user) return res.json({ error: "No user" });
    return db.user.findUnique({ where: { id: user.id } }).then((currentUser: User | null) => {
        if (!currentUser) throw new Error("User not found");
        return res.json(currentUser);
    });
};