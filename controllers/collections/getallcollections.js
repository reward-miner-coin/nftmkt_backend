import { GetAllCollections } from "../../services/collectionServices.js";

export default async ({ context, request, response }) => {
    const collections = await GetAllCollections();

    if(collections.length > 0){
        
        //response.status = 200;
        response.body = { msg: `Collections retrieved`, data: collections, success: true};
        console.log(response);
    } else {
        response.body = { msg: `Retrieving Collections error`, data: [], success: false};
    }
    
};