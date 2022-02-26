import { capitalize } from "../../utils"
import { authParam, getModelSchema, idParam, response400, response401, response403, response404, response500 } from "./utils"

const getRoutes = (model) => ([
   { path: `/api/${model}`, requests: ['get', 'post'] },
   { path: `/api/${model}/:id`, requests: ['get', 'put', 'delete'] },
])

const getGetArrMethod = (model) => ({
   tags: [capitalize(model)],
   parameters: [
      authParam
   ],
   responses: {
      "200": {
         description: "Success",
         content: {
            "application/json": {
               schema: {
                  type: "array",
                  items: getModelSchema(model)
               }
            }
         }
      },
      "401": response401,
      "403": response403,
      "500": response500
   }
})

const getPostMethod = (model) => ({
   tags: [capitalize(model)],
   parameters: [
      authParam
   ],
   requestBody: {
      required: true,
      content: {
         "application/json": {
            schema: getModelSchema(model)
         }
      }
   },
   responses: {
      "201": {
         description: "Created",
         content: {
            "application/json": {
               schema: getModelSchema(model)
            }
         }
      },
      "400": response400,
      "401": response401,
      "403": response403,
      "500": response500
   }
})

const getGetObjMethod = (model, method) => ({
   tags: [capitalize(model)],
   parameters: [
      authParam,
      idParam
   ],
   responses: {
      "200": {
         description: "Sucess",
         content: {
            "application/json": {
               schema: getModelSchema(model)
            }
         }
      },
      "401": response401,
      "403": response403,
      "404": response404,
      "500": response500
   }
})

const getPutMethod = (model, method) => ({
   tags: [capitalize(model)],
   parameters: [
      authParam,
      idParam
   ],
   requestBody: {
      required: true,
      content: {
         "application/json": {
            schema: getModelSchema(model)
         }
      }
   },
   responses: {
      "200": {
         description: "Updated",
         content: {
            "application/json": {
               schema: getModelSchema(model)
            }
         }
      },
      "401": response401,
      "403": response403,
      "404": response404,
      "500": response500
   }
})

const getDeleteMethod = (model) => ({
   tags: [capitalize(model)],
   parameters: [
      authParam,
      idParam
   ],
   responses: {
      "204": {
         description: "Not Content"
      },
      "401": response401,
      "403": response403,
      "404": response404,
      "500": response500
   }
})

const getMethod = (model, path, request) => {
   const includeId = path.includes(':id');
   if (!includeId && request === 'get')
      return getGetArrMethod(model);
   else if (!includeId && request === 'post')
      return getPostMethod(model);
   else if (includeId && request === 'get')
      return getGetObjMethod(model);
      else if (includeId && request === 'put')
         return getPutMethod(model);
   else if (includeId && request === 'delete')
      return getDeleteMethod(model);
   return {};
}

const getMethods = (model, path, requests) => {
   const methods = requests.map(request => ({ request, method: getMethod(model, path, request) }))
   return methods.reduce((previous, current) => ({ ...previous, [current.request]: current.method }), {});
}

const getCrudPaths = (model) => {
   const routes = getRoutes(model);
   const paths = routes.map(({ path, requests }) => ({ path, methods: getMethods(model, path, requests) }));
   return paths.reduce((previous, current) => ({ ...previous, [current.path]: current.methods }), {});
}

export default getCrudPaths;