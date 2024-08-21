import { allRecordsVault } from "../assignmentRecord";
import { tactDataHandler } from "./TACT/tactAPIWrapper";

export async function updateAllRecordsVault() {
    let preRecords = await tactDataHandler.allAssignments();
    for (let preRecord of preRecords) {
        console.log(preRecord.id, preRecord.dueDate?.toString());
        if ((allRecordsVault.filter( rec => rec.id === preRecord.id)).length > 0)
        {continue;};
        allRecordsVault.push(preRecord);
    }
    console.log(allRecordsVault.all());
}