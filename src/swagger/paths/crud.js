import { capitalize } from "../../utils"
import { authParam, getModelSchema, getResponse } from "./utils"

const includesId = (path) => path.includes(':id');

const getRoutes = (model) => ([
   { path: `/api/${model}`, requests: ['get', 'post'] },
   { path: `/api/${model}/:id`, requests: ['get', 'put', 'delete'] },
])

const getContentObj = (model) => ({
   "application/json": {
      schema: getModelSchema(model)
   }
})

const getResponseSuccess = (model, path, request) => {
   if (!includesId(path) && request === 'get')
      return {
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
         }
      };

   if (request === 'delete')
      return {
         "204": {
            description: 'Not Content'
         }
      };

   const code = (request === 'post') ? "201" : "200";

   let description = '';
   if (request === 'get')
      description = 'Success';
   else if (request === 'post')
      description = 'Created';
   else if (request === 'put')
      description = 'Updated';

   return {
      [code]: {
         description,
         content: getContentObj(model)
      }
   };
}

const getResponsesError = (path, request) => {
   const responses = {};

   if (request === 'post')
      responses["400"] = getResponse(400);

   responses["401"] = getResponse(401);
   responses["403"] = getResponse(403);

   if (includesId(path))
      responses["404"] = getResponse(404);

   responses["500"] = getResponse(500);

   return responses;
}

const getMethod = (model, path, request) => {
   const method = {
      tags: [capitalize(model)],
      parameters: [authParam]
   }

   if (includesId(path))
      method.parameters.push({
         in: "path",
         name: "id",
         type: "string",
         required: true
      });

   if (['post', 'put'].includes(request))
      method.requestBody = {
         required: true,
         content: getContentObj(model)
      };

   method.responses = {
      ...getResponseSuccess(model, path, request),
      ...getResponsesError(path, request),
   };

   return method;
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

const getCrudsPaths = (models) => {
   const paths = models.map(model => getCrudPaths(model));
   return paths.reduce((previous, current) => ({ ...previous, ...current }), {});
}

export default getCrudsPaths;