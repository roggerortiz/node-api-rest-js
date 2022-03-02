import { authParam, getModelSchema, getResponse } from "./utils";

const getRequestBody = (action) => {
   let schema = {};

   if (action === 'signup')
      schema = getModelSchema('user');
   else if (action === 'signin')
      schema = { "$ref": '#/components/schemas/SignIn' };
   else if (action === 'refreshtoken')
      schema = { "$ref": '#/components/schemas/RefreshToken' };

   return {
      required: true,
      content: { "application/json": { schema } }
   };
}

const getResponses = (action) => {
   const responses = {
      "200": {
         description: "Success",
         content: {
            "application/json": {
               schema: {
                  "$ref": '#/components/schemas/SignedIn'
               }
            }
         }
      }
   };

   if (action === 'signup')
      responses["400"] = getResponse(400);

   if (action !== 'signup')
      responses["401"] = getResponse(401);

   if (action === 'refreshtoken')
      responses["403"] = getResponse(403);

   if (action !== 'signup')
      responses["404"] = getResponse(404);

   responses["500"] = getResponse(500);

   return responses;
}

const getPostMethod = (action) => {
   const postMethod = { tags: ['Auth'] };

   if (action === 'signup')
      postMethod.security = [];
   else if (action === 'refreshtoken')
      postMethod.parameters = [authParam];

   postMethod.requestBody = getRequestBody(action);
   postMethod.responses = getResponses(action);

   return postMethod;
}

const getAuthPaths = () => ({
   "/api/auth/signup": {
      post: getPostMethod('signup')
   },
   "/api/auth/signin": {
      post: getPostMethod('signin')
   },
   "/api/auth/refreshToken": {
      post: getPostMethod('refreshtoken')
   }
})

export default getAuthPaths;