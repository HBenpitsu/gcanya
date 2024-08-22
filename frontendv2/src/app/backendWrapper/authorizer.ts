import { OAuthSig, showAuthURLSig } from "../signalv2";
import { endpoint } from "./endpoint";
import { vault } from "../vault";
import { sleep } from "../../utils";
import { authorizedFlag } from "../flag";

export namespace background{
    // OAuthSigのhandler
    export async function authorize() { // backgroundで呼び出し
        authorizedFlag.turnOff();
        for(let cc = 0;cc < 3;cc++) {

            putAuthURL();
            showAuthURLSig.send();
            await showAuthURLSig.wait();

            for (let c = 0;c < 10;c++) {
                let ret = await endpoint.getTokens();
                if (ret.detail == "success") {
                    authorizedFlag.turnOn();
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
}

export namespace foreground{
    vault.setDefault('auth_url', '');
   
    export function getAuthURL() { // foregroundで呼び出し
        return vault.get('auth_url') || null;
    }

    export function authorize() { // foregroundで呼び出し
        OAuthSig.send();
    }
}

