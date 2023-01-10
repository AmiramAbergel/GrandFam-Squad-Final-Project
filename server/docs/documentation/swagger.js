import swaggerSchemas from './swaggerSchemas.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GrandFam-Squad API',
            version: '1.0.0',
            description:
                'This is an API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://127.0.0.1:4000', //http://localhost:4000/
                description: 'Development server',
            },
        ],
        components: {
            // schemas: swaggerSchemas,
            // securitySchemes: {    noauthAuth:{
            // }
            //     type: http
            //     scheme: noauth
            //   bearerAuth:
            //     type: http
            //     scheme: bearer},
        },
    },
};
