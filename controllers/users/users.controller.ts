import { Request, Response } from 'express';
import { TIDParams } from '../../types/general-types';
import { createUser, deleteUser, queryUsers, updateUser } from '../../services/users/users.service';
import { User } from '@prisma/client';


export function requestGetUsers(req: Request, res: Response) {

    queryUsers(req.body).then((users: User[]) => {
        res.json(users);
    });
}

export function requestAddUser(req: Request, res: Response) {
    createUser(req.body).then((user: User) => {
        res.json(user);
    });

}

export function requestEditUser(req: Request, res: Response) {
    updateUser(req.body).then((user: User) => {
        res.json(user);
    }
    );
}

export function requestDeleteUser(req: Request<TIDParams>, res: Response) {
    deleteUser(req.params.id).then((resp) => {
        res.json(resp);
    });
}
