import fs from 'fs';
import path from 'path';
import authPaths from './authPaths';
import getCrudPaths from './crudPaths';

const getFullCrudPaths = (models) => {
   const paths = models.map(model => getCrudPaths(model));
   return paths.reduce((previous, current) => ({ ...previous, ...current }), {});
}

const getFullPaths = (models) => {
   return {
      ...authPaths,
      ...getFullCrudPaths(models)
   }
}

const getSpecs = (models, options) => ({
   ...options,
   paths: getFullPaths(models)
})

const generate = (options, models) => {
   const specs = getSpecs(models, options);
   const dataJSON = JSON.stringify(specs, null, 3);

   const filePath = path.join(__dirname, './../../..', `swagger.json`);
   fs.writeFileSync(filePath, dataJSON);

   const existsFile = !fs.existsSync(path);
   console.log(`Generate Docs: ${existsFile ? 'Success' : 'Failed'}`);
}

export default generate;