import swaggerAutogen from 'swagger-autogen';

const doc = {
   info: {
      title: "Rest API",
      version: "1.0.0",
   },
   host: "localhost:4000",
   basePath: "/",
   consumes: ['application/json'],
   produces: ['application/json'],
   tags: [
      { "name": "Auth" },
      { "name": "User" }
   ],
   securityDefinitions: {
      apiKeyAuth: {
         type: "apiKey",
         in: "header",
         name: "Authorization",
         description: "Json Web Token"
      }
   }
}

const outputFile = './swagger.json';
const endpointsFiles = ['./src/server/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);