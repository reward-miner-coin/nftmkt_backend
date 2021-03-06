import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.0.20/dist/ethers.esm.js";
import collectionsQueries from "../repositories/collectionsQueries.js";
import { returnedManyRows, returnedOneRow } from "./utils.js";
import nft from "./nft.js";


export const GetASingleCollection = async (name) => {
    const response = await returnedOneRow(await collectionsQueries.GetAlSingleCollection(name));
    let formattedResponse = {};
    let socials = {}
    if(Object.keys(response).length > 0){
        formattedResponse = {};
        for(let i = 0; i < Object.keys(response).length; i++){
            if(response[Object.keys(response)[i]] !== null && Object.keys(response)[i] !== 'collection_metadata'){
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
                if(response[y][Object.keys(response[y])[i]] !== null && Object.keys(response[y])[i] !== 'collection_metadata'){
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

export const GetEvents = async () => {
    let purchased = [];
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed3.binance.org');
    const contract = new ethers.Contract(
        '0xB815771Cd664b9fbaC56ab1E1Ba8fbca9C215a4b',
        nft,
        provider
    );
    const Block = await provider.getBlockNumber();
    console.log(Block);
    let eventFilter = contract.filters.C4N5Activated();
    let events = await contract.queryFilter(eventFilter , Block - 5000, Block);
    console.log(events);
    if(events.length > 0) {
        events.map((item) => purchased.push(item.args[1].toString()));
        return purchased;
    } else {
        return [];
    }

} 