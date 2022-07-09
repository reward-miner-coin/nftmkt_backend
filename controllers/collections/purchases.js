import { GetEvents } from "../../services/collectionServices.js";
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.0.20/dist/ethers.esm.js";

export default async ({ context, request, response }) => {
    const res = await GetEvents();
    if(res.length > 0){
        //response.status = 200;
        response.body = { msg: `nfts purchased`, data: res, success: true};
    } else {
        response.body = { msg: `error`, data: [], success: false};
    }
};