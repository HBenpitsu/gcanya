import { AssignmentRecord, AssignmentRecordVault } from "../assignmentRecord";
import { signalTerminal, Signal } from "../signal";
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
                signalTerminal.send(Signal.OAuth);
            }
            failed = true;
        }
    }

    if (failed){
        await signalTerminal.wait(Signal.OAuth);
    } else {
        return;
    }

    }
}

