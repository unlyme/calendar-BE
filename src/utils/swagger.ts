import express from "express";

require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for scheduler node backend",
    },
    servers: [
      {
        url: process.env.API_ENDPOINT ?? "http://localhost:3000",
      },
    ],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/schemas/*.ts", "./src/routes/admin/*.ts"], // Replace with your route files location
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
