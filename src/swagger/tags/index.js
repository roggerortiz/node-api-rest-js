import { capitalize } from "../../utils";

const getTagsByModels = (models) => {
   return models.map(model => ({ name: capitalize(model) }));
}

const getTags = (models) => ([
   { name: "Auth" },
   ...getTagsByModels(models)
])

export default getTags;