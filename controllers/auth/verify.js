import { verifyMessage } from "../../services/auth.js";
//import * as cookie from "https://deno.land/std/http/cookie.ts";
import { deleteCookie, setCookie, getCookies } from "https://deno.land/std@0.146.0/http/cookie.ts";

export default async ({ cookies, request, response }) => {
    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "Invalid user data", success: false };
        return;
    }

    const {address, signature} = await request.body().value;

    let res = await verifyMessage(address, signature);
    if(res.authenticated){
        //cookies.set("rmcnft", res.token, {path: "/", maxAge: 1036800});
        //response.body = { msg: "User Authenticated", success: true, data: res };
    } else {
        //response.body = { msg: "Authentication failed", success: false, data: res };
    }

};