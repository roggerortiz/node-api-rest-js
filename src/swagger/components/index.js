import schemas from "./schemas";

const getComponents = () => ({
   securitySchemes: {
      bearerAuth: {
         type: "http",
         scheme: "bearer",
         bearerFormat: "JWT"
      }
   },
   schemas,
   parameters: {
      authorization: {
         in: "header",
         name: "authorization",
         type: "string"
      }
   }
});

export default getComponents;