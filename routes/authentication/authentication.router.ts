
import express from 'express';
import { requestCurrentUser, requestLogin, requestLogout, requestSignup } from '../../controllers/authentication/authentication.controller';
import authenticationValidation from './authentication.validation';


const router = express.Router();

router.post('/signup', authenticationValidation(), requestSignup);
router.post('/login', authenticationValidation(), requestLogin);
router.post('/logout', requestLogout);
router.get('/current-user', requestCurrentUser);


export default router;