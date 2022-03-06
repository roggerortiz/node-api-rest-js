import fs from 'fs';
import path from 'path';
import getTags from "./tags";
import getPaths from "./paths";
import getComponents from "./components";

const models = ['user'];

const getSwaggerSpecs = () => {
   const tags = getTags(models);
   const paths = getPaths(models)
   const components = getComponents(models);

   return {
      openapi: '3.0.0',
      info: {
         title: "Rest API",
         version: "1.0.0",
      },
      host: "localhost:4000",
      basePath: "/",
      consumes: ['application/json'],
      produces: ['application/json'],
      tags,
      components,
      security: [
         { bearerAuth: [] }
      ],
      securityDefinitions: {
         apiKeyAuth: {
            type: "http",
            in: "header",
            name: "Authorization",
            description: "Json Web Token"
         }
      },
      paths
   };
}

const generateDocs = () => {
   const swaggerSpecs = getSwaggerSpecs();
   const filePath = path.join(__dirname, './..', './..', 'swagger.json');
   fs.writeFileSync(filePath, JSON.stringify(swaggerSpecs, null, 3));
}

generateDocs();