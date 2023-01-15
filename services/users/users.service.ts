import db from '../../utils/db/db';
import { User } from '@prisma/client';

export function createUser({ first_name, last_name, email, password }: User) {

    return db.user.create({
        data: {
            first_name, last_name, email, password
        }
    });
}

export function updateUser({ id, first_name, last_name, email, password }: User) {

    return db.user.update({
        where: { id: Number(id) },
        data: {
            first_name, last_name, email, password
        }
    });
}

export function queryUsers(params: any) {
    // TODO add filtering params
    return db.user.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    });
}

export function deleteUser(id: number) {
    return db.user.delete({
        where: {
            id: Number(id)
        }
    });
}