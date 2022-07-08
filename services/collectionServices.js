import collectionsQueries from "../repositories/collectionsQueries.js";
import { returnedManyRows, returnedOneRow } from "./utils.js";

export const GetASingleCollection = async (name) => {
    const response = await returnedOneRow(await collectionsQueries.GetAlSingleCollection(name));
    let formattedResponse = {};
    let socials = {}
    if(Object.keys(response).length > 0){
        formattedResponse = {};
        for(let i = 0; i < Object.keys(response).length; i++){
            if(response[Object.keys(response)[i]] !== null){
                if(Object.keys(response)[i].slice(0,6) === 'social'){
                    socials[Object.keys(response)[i]] = response[Object.keys(response)[i]]
                    //console.log(response[Object.keys(response)[i]]);
                } else {
                    formattedResponse[Object.keys(response)[i]] = response[Object.keys(response)[i]];
                }   
            }
        }
        formattedResponse['socials'] = socials;
        return formattedResponse;
    } else {
        return {};
    }
}

export const GetAllCollections = async () => {
    let formattedResponse = {};
    let outputResponses = [];
    const response = await returnedManyRows(await collectionsQueries.GetAllCollections());
    if(Object.keys(response).length > 0){
        for(let y = 0; y < response.length; y++){
            formattedResponse = {};
            for(let i = 0; i < Object.keys(response[y]).length; i++){
                if(response[y][Object.keys(response[y])[i]] !== null){
                    formattedResponse[Object.keys(response[y])[i]] = response[y][Object.keys(response[y])[i]];
                }
            }
            outputResponses.push(formattedResponse);
        }
        return outputResponses;
    } else {
        return [];
    }
}