import { Request } from "express";

export function logoutUser(req: Request) {
    return req.session.destroy(function (err) {
        if (err) throw new Error("Error destroying session");
    });
}