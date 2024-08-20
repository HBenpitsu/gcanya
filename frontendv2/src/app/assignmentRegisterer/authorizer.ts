import { showAuthURLSig, OAuthSig } from "../signalv2";
import { endpoint } from "./endpoint";
import { vault } from "../vault";
import { sleep } from "../../utils";

vault.setDefault('authorized', 'false');

export async function authorize() { // backgroundで呼び出し
    vault.set('authorized', 'false');
    for(let cc = 0;cc < 3;cc++) {

        putAuthURL();
        showAuthURLSig.send();
        await showAuthURLSig.wait();

        for (let c = 0;c < 10;c++) {
            let ret = await endpoint.getTokens();
            if (ret.detail == "success") {
                vault.set('authorized', 'true');
                return;
            } else if (ret.detail == "Unauthorized") {
                break;
            } else if ( ret.detail == "Timeout" ) {
                await sleep(20000);
            }
        }

    }
}

export async function putAuthURL() { // backgroundで呼び出し
    let ret = await endpoint.getAuthFlowState();
    vault.set('auth_url', ret.auth_url);
}

export function getAuthURL() { // foregroundで呼び出し
    vault.setDefault('auth_url', '');
    return vault.get('auth_url') || null;
}
