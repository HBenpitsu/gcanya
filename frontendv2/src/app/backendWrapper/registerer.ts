import { Temporal } from "temporal-polyfill";
import { allRecordsVault, AssignmentRecord, registerationQueue } from "../assignmentRecord";
import { authorizedFlag } from "../flag";
import { OAuthSig, registerSig } from "../signalv2";
import { endpoint } from "./endpoint";

export namespace background{
    export async function register() { // backgroundで呼び出し
        let tokenRefreshFailed = false;
        while (registerationQueue.all().length > 0) {
            
            let succeededRecords: string[] = [];

            for (let record of registerationQueue.all()) {
                if (record.dueDate.toInstant().epochSeconds < Temporal.Now.instant().epochSeconds) { 
                    succeededRecords.push(record.id);
                } else {
                    let ret = await endpoint.register(record);
                    if (ret.detail == "success") {
                        authorizedFlag.turnOn();
                        succeededRecords.push(record.id);
                    } else {
                        let ret = await endpoint.refreshTokens();
                        if (ret.detail !== "success") { tokenRefreshFailed = true; }
                        break;
                    }
                }
            }

            registerationQueue.drop( rec=> succeededRecords.includes(rec.id));
            for (let record of allRecordsVault.filter( rec=> succeededRecords.includes(rec.id))){
                record.markAsRegistered();
            }

            if (tokenRefreshFailed) {break;}    
        }

        if (tokenRefreshFailed) {
            authorizedFlag.turnOff();
            OAuthSig.send();
        }
    }
}

export namespace foreground{
    export async function registerOneRecord(record: AssignmentRecord) { // forgegroundで呼び出し
        registerationQueue.push(record);
        registerSig.send();
    }

    export async function registerAllPendingAssignments() { // forgegroundで呼び出し
        let pendingRecords = allRecordsVault.filter( rec => rec.isPending());
        for (let record of pendingRecords) {
            registerationQueue.push(record.asObj());
        }
        registerSig.send();
    }
}