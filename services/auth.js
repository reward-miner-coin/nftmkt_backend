import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.0.20/dist/ethers.esm.js";
import * as jwt from 'https://deno.land/x/jose@v4.8.1/index.ts'
import authQueries from "../repositories/authQueries.js";
import { returnedOneRow } from "./utils.js";

const tempKey = ''

const getToken = async (object) => {
    const secret = new TextEncoder().encode(
      Deno.env.get("PVK") || tempKey
    );
    const token = 
        await new jwt.SignJWT(object)
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(secret);
    
    return token;
};

export const decryptToken = async (token) => {
    const secret = new TextEncoder().encode(
        Deno.env.get("PVK") || tempKey
      );
    const { payload, protectedHeader } = await jwt.jwtVerify(token, secret);
      return {
        payload,
        protectedHeader,
        isTokenExpired: isTokenExpired(payload),
        verifiedAddress: payload.address
      }
}

export const isTokenExpired = (tokenExpiration) => {
    if(Date.now() >= tokenExpiration.exp * 1000) {
        return true;
    } else {
        return false;
    }
}

export const getRandomNonce = async () => {
    return Math.floor(Math.random() * 10000000);
}

export const autoAuth = async (address, nftid) => {
    const token = await getToken({address, nftid});
    return {authenticated: true, token, tte: tte.active_at};
}

export const verifyMessage = async (address, signature) => {
    const retrievedSession = await returnedOneRow(await authQueries.getSession(address));
    
    const decodedAddress = ethers.utils.verifyMessage("Rewardminer.io is verifrying your address. Here's a one time access code: " + retrievedSession.nonce.toString(), signature);

    if(address.toLowerCase() === decodedAddress.toLowerCase()){
    
        /*const token = await getToken({address});
        await authQueries.setSessionActive(retrievedSession.sessionid);
        const tte = await returnedOneRow(await authQueries.getTimestampSessionById(retrievedSession.sessionid));*/
        
        return {authenticated: true}//, token, tte: tte.active_at};
    } else {
        return {authenticated: false}//, token: ''};
    }
};

export const createSession = async (address) => {
    const retrievedSession = await returnedOneRow(await authQueries.getSession(address));
    const nonce = await getRandomNonce();
    if(Object.keys(retrievedSession).length != 0 && retrievedSession.constructor === Object){
        await authQueries.resetNonce(address, nonce);
        return nonce;
    } else {
        await authQueries.createSession(address, nonce);
        return nonce;
    }
}
