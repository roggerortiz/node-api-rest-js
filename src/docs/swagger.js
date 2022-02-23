export default {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Rest API",
         version: "1.0.0",
         description: "A basic rest api using express"
      },
      servers: [
         {
            url: "http://localhost:4000"
         }
      ]
   },
   apis: [
      "./src/docs/**/*.yaml",
      "./src/routes/**/*.js",
   ]
}