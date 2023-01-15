/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         first_name:
 *           type: PROPERTY_TYPE
 *           description: PROPERTY_DESCRIPTION
 *         last_name:
 *           type: PROPERTY_TYPE
 *           description: PROPERTY_DESCRIPTION
 *         email:
 *           type: PROPERTY_TYPE
 *           description: PROPERTY_DESCRIPTION
 *         password:
 *           type: PROPERTY_TYPE
 *           description: PROPERTY_DESCRIPTION
 *         role:
 *           $ref: '#/components/schemas/enums/role'  
 *           type: PROPERTY_TYPE
 *           description: PROPERTY_DESCRIPTION
 *       example:
 *         id: d5fE_asz
 *         first_name: EXAMPLE 
 *         last_name: EXAMPLE
 *         email: EXAMPLE
 *         password: EXAMPLE
 */
import express from 'express';
import { requestAddUser, requestDeleteUser, requestEditUser, requestGetUsers } from '../../controllers/users/users.controller';
import { validate } from '../../utils/validation.helper';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created.
 *         content:
 *           application/json:
 *             schema:
 *               ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */
router.get('/', requestGetUsers);

router.post('/',
    upload.single('file'),
    validate, requestAddUser);

router.put('/',
    upload.single('file'),
    requestEditUser);

router.delete('/:id', requestDeleteUser);

export default router;