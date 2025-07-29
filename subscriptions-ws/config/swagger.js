require("dotenv").config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const CINEMA_WS_API_KEY = process.env.CINEMA_WS_API_KEY;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subscriptions WS API",
      version: "1.0.0",
      description: "API documentation for Subscriptions WS backend",
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key", // או שם ההדר שלך בפועל
        },
      },
    },
    security: [{ ApiKeyAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions = {
  swaggerOptions: {
    authAction: {
      ApiKeyAuth: {
        name: "x-api-key",
        schema: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "",
        },
        value: CINEMA_WS_API_KEY,
      },
    },
  },
};

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );
};

module.exports = setupSwagger;