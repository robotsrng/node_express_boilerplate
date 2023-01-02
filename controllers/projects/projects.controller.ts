import { Request, Response, NextFunction } from 'express';
import db from '../../utils/db/db';
import { TIDParams } from '../../utils/types/general-types';
import { Project } from '@prisma/client';



export function addProject(req: Request, res: Response) {

    return db.project.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.imageUrl,
        }
    }).then((project: any) => {
        res.json(project);
    }
    );
}

export function getProjects(req: Request, res: Response) {

    return db.project.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    }).then((projects: any) => {
        res.json(projects);
    });
}


export function deleteProject(req: Request<TIDParams>, res: Response) {
    return db.project.delete({
        where: {
            id: Number(req.params.id)
        }
    }).then((resp) => {
        res.json(resp);
    });
}
