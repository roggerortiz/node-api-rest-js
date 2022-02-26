import generate from "./generate";

const options = {
   openapi: '3.0.0',
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
   components: {
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
         }
      },
      schemas: {
         "SignIn": {
            type: "object",
            properties: {
               email: {
                  type: "string"
               },
               password: {
                  type: "string"
               }
            }
         },
         "RefreshToken": {
            type: "object",
            properties: {
               refreshToken: {
                  type: "string"
               }
            }
         },
         "SignedIn": {
            type: "object",
            properties: {
               subs: {
                  type: "string"
               },
               name: {
                  type: "string"
               },
               username: {
                  type: "string"
               },
               email: {
                  type: "string"
               },
               accessToken: {
                  type: "string"
               },
               refreshToken: {
                  type: "string"
               }
            }
         },
         "Result": {
            type: "object",
            properties: {
               message: {
                  type: "string"
               }
            }
         },
         "User": {
            type: "object",
            properties: {
               name: {
                  type: "string"
               },
               username: {
                  type: "string"
               },
               email: {
                  type: "string"
               },
               password: {
                  type: "string"
               }
            },
            required: [
               "name",
               "username",
               "pasword"
            ]
         }
      },
      parameters: {
         authorization: {
            in: "header",
            name: "authorization",
            type: "string"
         }
      }
   },
   security: [
      {
         bearerAuth: []
      }
   ],
   securityDefinitions: {
      apiKeyAuth: {
         type: "http",
         in: "header",
         name: "Authorization",
         description: "Json Web Token"
      }
   }
}

const models = [
   'user'
]

generate(options, models);