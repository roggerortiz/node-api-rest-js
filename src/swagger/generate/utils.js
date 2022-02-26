import { capitalize } from "../../utils";

export const getModelSchema = (model) => ({
   "$ref": `#/components/schemas/${capitalize(model)}`
})

export const authParam = {
   "$ref": `#/components/parameters/authorization`
};

export const idParam = {
   in: "path",
   name: "id",
   type: "string",
   required: true
};

export const response400 = {
   description: "Bad Request",
   content: {
      "application/json": {
         schema: {
            "$ref": '#/components/schemas/Result'
         }
      }
   }
}

export const response401 = {
   description: "Unauthorized",
   content: {
      "application/json": {
         schema: {
            "$ref": '#/components/schemas/Result'
         }
      }
   }
}

export const response403 = {
   description: "Forbidden",
   content: {
      "application/json": {
         schema: {
            "$ref": '#/components/schemas/Result'
         }
      }
   }
}

export const response404 = {
   description: "Not Found",
   content: {
      "application/json": {
         schema: {
            "$ref": '#/components/schemas/Result'
         }
      }
   }
}

export const response500 = {
   description: "Internal Server Error",
   content: {
      "application/json": {
         schema: {
            "$ref": '#/components/schemas/Result'
         }
      }
   }
}