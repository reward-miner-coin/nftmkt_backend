import { GetASingleCollection } from "../../services/collectionServices.js";
export default async ({ params, response }) => {
    const name = params.name;

    if (!name) {
        response.status = 400;
        response.body = { msg: "Collection Invalid", success: false, data: {} };
        return;
      }
    
    const Collection = await GetASingleCollection(name);
    if (!(Object.keys(Collection).length > 0)) {
      //response.status = 404;
      response.body = { msg: `No Collection Found`, success: false, data: {} };
      return;
    }
    
    response.body = { msg: `Collection found`, data: Collection, success: true};
};