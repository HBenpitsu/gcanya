import { Signal, SignalState, signalTerminal } from "../signal";
import { endpoint } from "./endpoint";
import { vault } from "../vault";
import { sleep } from "../../utils";

export async function authorize() { // backgroundで呼び出し
    let authorization_should_be_done_from_scratch = true;
    while(authorization_should_be_done_from_scratch){
        authorization_should_be_done_from_scratch = false;

        putAuthURL();
        await signalTerminal.wait(Signal.AuthURLShown);

        let got_tokens = false;
        while (!got_tokens) {
            let ret = await endpoint.getTokens();
            if (ret.detail == "success") {
                got_tokens = true;
            } else if (ret.detail == "Unauthorized") {
                got_tokens = true;
                authorization_should_be_done_from_scratch = true;
            } else if ( ret.detail == "Timeout" ) {
                await sleep(10000);
            }
        }
    }
}

export async function putAuthURL() { // backgroundで呼び出し
    let ret = await endpoint.getAuthFlowState();
    vault.set('auth_url', ret.auth_url);
    signalTerminal.send(Signal.AuthURLShown);
}

export async function getAuthURL() { // foregroundで呼び出し
    vault.setDefault('auth_url', '');
    return vault.get('auth_url') || null;
}
