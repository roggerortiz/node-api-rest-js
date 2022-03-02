import { capitalize } from "../../utils";

export const authParam = {
   "$ref": `#/components/parameters/authorization`
};

export const getModelSchema = (model) => ({
   "$ref": `#/components/schemas/${capitalize(model)}`
})

export const getResponse = (code) => {
   let description = '';

   if (code >= 200 && code <= 299) description = "Success";
   else if (code === 400) description = 'Bad Request';
   else if (code === 401) description = 'Unauthorized';
   else if (code === 403) description = 'Forbidden';
   else if (code === 404) description = 'Not Found';
   else if (code === 500) description = 'Internal Server Error';
   else description = "Error";

   return {
      description,
      content: {
         "application/json": {
            schema: {
               "$ref": '#/components/schemas/Result'
            }
         }
      }
   };
}