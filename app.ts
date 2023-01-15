import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { projectsRouter, usersRouter, authRouter } from './routes';

import multer from 'multer';
import FileUploadService from './services/fileUpload/fileUpload.service';
import { MulterRequest } from './types/general-types';
import { baseLimiter } from './middleware/rateLimiting/rateLimiter';
import generateSwagger from './swagger/swagger';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import cors from 'cors';
import db from './utils/db/db';
import { isAuthenticated } from './middleware/authentication/authentication.middleware';
var app = express();

app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: false,
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        },
        secret: 'htlksm785jlf',
        resave: true,
        saveUninitialized: true,
        // store: new PrismaSessionStore(
        //     db,
        //     {
        //         checkPeriod: 2 * 60 * 1000,  //ms
        //         dbRecordIdIsSessionId: true,
        //         dbRecordIdFunction: undefined,
        //     }
        // )
    })
);//Still you index.js/server.js (Server entry point)

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
        credentials: true,
    })
);


const fileUpload = new FileUploadService();
export const upload = multer({ storage: multer.memoryStorage() });

// app.use(baseLimiter);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

generateSwagger(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/projects',  projectsRouter);
app.use('/users', usersRouter);
app.use('/auth',
    authRouter);

app.listen(8080, () => { console.info("Listening on 8080"); });


process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
    console.log("🚀 | file: app.ts:79 | process.on | reason", reason);
    // I just caught an unhandled promise rejection,
    // since we already have fallback handler for unhandled errors (see below),
    // let throw and let him handle that
    // console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    console.log("🚀 | file: app.ts:88 | process.on | error", error);
    console.log("🚀 | file: app.ts:87 | process.on | error");
    // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
    // errorManagement.handler.handleError(error);
    // console.error("Uncaught Exception thrown", error);
    process.exit(1);
});

// TODO finish image uploader
// TODO add proper authentication
// TODO add proper error handling