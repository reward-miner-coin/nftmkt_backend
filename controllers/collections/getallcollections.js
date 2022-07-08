import { GetAllCollections } from "../../services/collectionServices.js";

export default async ({ request, response }) => {
    const collections = await GetAllCollections();

    if(collections.length > 0){
        response.body = { msg: `Collections retrieved`, data: collections, success: true};
    } else {
        response.body = { msg: `Retrieving Collections error`, data: [], success: false};
    }
    
};