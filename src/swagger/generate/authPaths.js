import { authParam, getModelSchema, response400, response401, response403, response404, response500 } from "./utils";

const schema = 'Auth';

const signedInParam = {
   "$ref": '#/components/schemas/SignedIn'
}

const signUpMethod = {
   tags: [schema],
   security: [],
   requestBody: {
      required: true,
      content: {
         "application/json": {
            schema: getModelSchema('user')
         }
      }
   },
   responses: {
      "200": {
         description: "Success",
         content: {
            "application/json": {
               schema: signedInParam
            }
         }
      },
      "400": response400,
      "500": response500
   }
}

const getSignInMethod = {
   tags: [schema],
   requestBody: {
      required: true,
      content: {
         "application/json": {
            schema: {
               "$ref": '#/components/schemas/SignIn'
            }
         }
      }
   },
   responses: {
      "200": {
         description: "Success",
         content: {
            "application/json": {
               schema: signedInParam
            }
         }
      },
      "401": response401,
      "404": response404,
      "500": response500
   }
}

const getRefreshMethod = {
   tags: [schema],
   parameters: [
      authParam
   ],
   requestBody: {
      required: true,
      content: {
         "application/json": {
            schema: {
               "$ref": `#/components/schemas/RefreshToken`
            }
         }
      }
   },
   responses: {
      "200": {
         description: "Success",
         content: {
            "application/json": {
               schema: signedInParam
            }
         }
      },
      "401": response401,
      "403": response403,
      "404": response404,
      "500": response500
   }
}

const authPaths = {
   "/api/auth/signup": {
      post: signUpMethod
   },
   "/api/auth/signin": {
      post: getSignInMethod
   },
   "/api/auth/refreshToken": {
      post: getRefreshMethod
   }
}

export default authPaths;