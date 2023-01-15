import { Request, Response } from 'express';
import { TIDParams } from '../../types/general-types';
import { createProject, deleteProject, getProjects, updateProject } from '../../services/projects/projects.service';
import { Project } from '@prisma/client';


export function requestGetProjects(req: Request, res: Response) {
    return getProjects().then((projects: Project[]) => {
        res.json(projects);
    });
}
export function requestAddProject(req: Request, res: Response) {
    console.log("🚀 | file: projects.controller.ts:14 | requestAddProject | req", req);
    // TODO FINISH FILE UPLOAD
    // const file  = req.file;
    return createProject(req.body).then((project: Project) => {
        console.log("🚀 | file: projects.controller.ts:17 | createProject | project", project);
        res.json(project);
    });
}

export function requestEditProject(req: Request, res: Response) {
    return updateProject(req.body).then((project: Project) => {
        res.json(project);
    }
    );
}

export function requestDeleteProject(req: Request<TIDParams>, res: Response) {
    return deleteProject(req.params.id).then((resp) => {
        res.json(resp);
    });
}
