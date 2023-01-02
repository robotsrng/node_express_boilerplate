/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the project
 *         title:
 *           type: string
 *           description: The projects title
 *         content:
 *           type: string
 *           description: Rich text content of the project description
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the project was added
 *       example:
 *         id: d5fE_asz
 *         title: Redux Tutorial
 *         content: This is a tutorial on how to use Redux
 *         imageUrl: https://image.com
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
import express from 'express';
import { addProject, deleteProject, getProjects } from '../controllers/projects/projects.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The projects managing API
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 *
 */
router.get('/', getProjects);


/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The projects managing API
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 *
 */
router.post('/', addProject);


router.delete('/:id', deleteProject);


export default router;