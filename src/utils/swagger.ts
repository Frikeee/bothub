import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import {Request, Response} from "express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API BotHub <3',
            version: '1.0.0',
        },
        servers: [
            {
                url: '/api',  // указываем префикс для всех маршрутов
                description: 'API Server'
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ]
    },
    apis: ['./src/schemas/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(apiRotes: any) {

    apiRotes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    apiRotes.get('docs.json', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    console.log('Docs loaded');
}

export default swaggerDocs;