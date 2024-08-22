import { allRecordsVault } from "../assignmentRecord";
import { tactDataHandler } from "./TACT/tactAPIWrapper";

export async function updateAllRecordsVault() {
    let preRecords = await tactDataHandler.allAssignments();
    for (let preRecord of preRecords) {
        // allRecordsVaultにidの重複がなければ登録する．
        if ((allRecordsVault.filter( rec => rec.id === preRecord.id)).length > 0)
        {continue;};
        allRecordsVault.push(preRecord);
    }
}