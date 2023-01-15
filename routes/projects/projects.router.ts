
import express from 'express';
import { requestAddProject, requestDeleteProject, requestEditProject, requestGetProjects } from '../../controllers/projects/projects.controller';
import { validate } from '../../utils/validation.helper';
import projectSanitization from './projects.sanitization';
import projectValidation from './projects.validation';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The projects managing API
 * /Projects:
 *   post:
 *     summary: Create a new Project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created.
 *         content:
 *           application/json:
 *             schema:
 *               ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 *
 */
router.get('/', requestGetProjects);


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
router.post('/',
    // upload.single('file'),
    // projectSanitization(), projectValidation(), validate,
     requestAddProject);

/**
 * @swagger
 *  tags: [Projects]     
 * /projects/{id}:
 *  put:
 *   summary: Update the project with the specified ID
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: The project ID
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Project'
 *   responses:
 *     200:
 *       description: The project was updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     404:
 *       description: The project was not found
 *     500:
 *       description: Some error happened
 */
router.put('/',
    // upload.single('file'),
    // projectSanitization(), projectValidation(), validate,
     requestEditProject);

/**
 * @swagger
 *  tags: [Projects]     
 * /projects/{id}:
 *   delete:
 *     description: Deletes a project with the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted the project
 *       404:
 *         description: Project with the specified ID was not found
 */
router.delete('/:id', requestDeleteProject);


export default router;