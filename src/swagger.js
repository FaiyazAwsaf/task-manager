const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API Documentation for Task Manager",
        },
        servers: [{ url: "http://localhost:3000/api/v1" }],
    },
    apis: ["./routes/*.js"], // Path to API route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
