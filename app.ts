import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { projectsRouter } from './routes';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

var app = express();

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "ShatteredBackend",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "ShatteredDev",
          url: "https://www.shattered.dev",
          email: "info@shattered.dev",
        },
      },
    //   servers: [
    //     {
    //       url: "http://localhost:8080",
    //     },
    //   ],
    },
    apis: ["./routes/**/*.ts"],
  };
  const specs = swaggerJsdoc(options);
  
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
  

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/projects', projectsRouter);

app.listen(8080, () => console.log("Listening on 8080"));
