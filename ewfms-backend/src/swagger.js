import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EWFMS Backend API',
            version: '1.0.0',
            description: 'Enterprise Workforce and Task Management System Backend API Documentation'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [{
            url: 'http://localhost:3000',
        },],
    },
    apis: ['./src/modules/**/*.routes.js'],
}

const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi, swaggerSpec };