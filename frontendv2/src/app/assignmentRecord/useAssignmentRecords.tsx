import { AssignmentRecordVault } from './assignmentRecordVault';
import { useState,useEffect } from 'react';

export function useAssignmentRecordVault(id:string=""): AssignmentRecordVault{
    const [vaultContent, setVaultContent] = useState<string>("");
    const recordVault = new AssignmentRecordVault(id);
    useEffect(//初回レンダリング時のみ実行する．
        ()=>{
            recordVault.addVaultUpdateListener(async (value)=>{
                setVaultContent(value);
            })
        },[]
    )
    return recordVault
}
