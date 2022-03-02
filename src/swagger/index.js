import getTags from "./tags";
import getPaths from "./paths";
import getComponents from "./components";

const models = ['user'];

const swaggerDocs = {
   openapi: '3.0.0',
   info: {
      title: "Rest API",
      version: "1.0.0",
   },
   host: "localhost:4000",
   basePath: "/",
   consumes: ['application/json'],
   produces: ['application/json'],
   tags: getTags(models),
   components: getComponents(),
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
   paths: getPaths(models)
};

export default swaggerDocs;