import db from '../../utils/db/db';
import { Project } from '@prisma/client';

export function getProjects() {
    return db.project.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    });
}

export function createProject({ title, content, imageUrl }: Project) {
    console.log("🚀 | file: projects.service.ts:15 | createProject | title", title);
    return db.project.create({
        data: {
            title,
            content,
            imageUrl,
        }
    });
}

export function updateProject({ id, title, content, imageUrl }: Project) {
    console.log("🚀 | file: projects.service.ts:26 | updateProject | id", id);
    return db.project.update({
        where: { id: Number(id) },
        data: {
            title,
            content,
            imageUrl,
        }
    });
}

export function deleteProject(id: number) {
    console.log("🚀 | file: projects.service.ts:43 | deleteProject | id", id);
    return db.project.delete({
        where: {
            id: Number(id)
        }
    });
}
