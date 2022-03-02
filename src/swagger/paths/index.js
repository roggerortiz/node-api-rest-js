import getAuthPaths from "./auth";
import getCrudsPaths from "./crud";

const getPaths = (models) => ({
   ...getAuthPaths(),
   ...getCrudsPaths(models)
});

export default getPaths;