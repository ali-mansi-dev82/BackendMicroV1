const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function swaggerConfig(app) {
  const swaggerDoc = swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "Backend Micro",
        version: "1.0.0",
        description: "Backend Micro swagger docs",
      },
    },
    apis: [process.cwd() + "/src/swap_mart/**/*.swagger.js"],
  });
  const swagger = swaggerUi.setup(swaggerDoc, {});
  app.use("/api", swaggerUi.serve, swagger);
}

module.exports = swaggerConfig;
