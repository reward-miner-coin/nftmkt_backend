import { GetAllCollections } from "../../services/collectionServices.js";

export default async ({ request, response }) => {
    console.log(response);
    const collections = await GetAllCollections();


    if(collections.length > 0){
        console.log(response);
        response.body = { msg: `Collections retrieved`, data: collections, success: true};
        console.log(response);
    } else {
        console.log(response);
        response.body = { msg: `Retrieving Collections error`, data: [], success: false};
        console.log(response);
    }
    
};