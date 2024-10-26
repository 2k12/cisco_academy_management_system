import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Definición básica de la configuración
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Cisco_Management",
      version: "1.0.0",
      description: "Documentación de API generada con Swagger",
    },
    servers: [
      {
        url: "http://localhost:4000", // URL base de tu API
      },
    ],
  },
  // Especifica dónde buscar los comentarios en tu código
  apis: ["./src/routes/api_routes/*.js"], // Ajusta la ruta según la ubicación de tus archivos de rutas
};

// Inicializa swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Exporta las variables usando la sintaxis de módulos ES
export { swaggerDocs, swaggerUi };
