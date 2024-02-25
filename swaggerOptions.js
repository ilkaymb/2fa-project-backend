const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "2FA Example API",
      version: "1.0.0",
      description: "A simple API to demonstrate 2FA with JWT authentication",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Eğer routes klasörü kök dizindeyse
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
