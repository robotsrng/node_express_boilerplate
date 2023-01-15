
import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ENUMS } from './enumDefs';

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
        components: {
            schemas: {
                enums: {
                    ...ENUMS,
                }
            }
        }
    },
    apis: ["./routes/**/*.ts", "./swagger/enumDefs.ts"],
};

const specs = swaggerJsdoc(options);

const generateSwagger = (app: Application) => {

    app.get("/apiDocs/swagger.json", (req, res) => res.json(specs));
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
};

export default generateSwagger;