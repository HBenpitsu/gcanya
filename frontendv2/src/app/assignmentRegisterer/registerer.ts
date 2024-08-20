import { AssignmentRecordVault } from "../assignmentRecord";
import { OAuthSig } from "../signalv2";
import { endpoint } from "./endpoint";

export async function register() { // backgroundで呼び出し
    while (true) {
    
    let records = new AssignmentRecordVault('registeration_queue');
    let failed = false;
    for (let record of records.all()){
        let responce = await endpoint.register(record);
        if (responce.detail == "Unauthorized"){
            let res = await endpoint.refreshTokens();
            if (res.detail == "Unauthorized"){
                OAuthSig.send();
            }
            failed = true;
        }
    }

    if (failed){
        await OAuthSig.wait();
    } else {
        return;
    }

    }
}

