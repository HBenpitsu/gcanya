
import { useEffect, useState } from "react";
import { allRecordsVault, AssignmentRecord } from "../app/assignmentRecord";
import { registerOneRecord } from '../app/assignmentRegisterer/registerer';
import parse from 'html-react-parser';
import { AssignmentStatus } from "../app/assignmentRecord/assignmentRecord";
import { Temporal } from "temporal-polyfill";

type AssignmentEntryProps = {
    record: AssignmentRecord;
}

const AssignmentDurationSetter = ({record}:AssignmentEntryProps)=>{
    const iptIdString = `durationSetter,${record.id}`;
    let [durationState, setDurationState] = useState(record.duration.toString());
    return <div>
        <input type="text" value={durationState} id={iptIdString} onChange={
            e=>{setDurationState(e.target.value);}
        }/>
        <button onClick={()=>{
            let iptElm = document.getElementById(iptIdString) as HTMLInputElement;
            record.duration = Temporal.Duration.from(durationState);
        }}>更新</button>
    </div>
}

const RecordStateSetter = ({record}:AssignmentEntryProps)=>{
    return <div>
        <select value={record.status} onChange={(e)=>{
            record.status = parseInt(e.target.value);
        }}>
            <option value={AssignmentStatus.Pending}>未着手</option>
            <option value={AssignmentStatus.Registered}>登録済</option>
            <option value={AssignmentStatus.Completed}>完了</option>
        </select>
    </div>
}

const RecordStateDisplay = ({record}:AssignmentEntryProps)=>{
    switch(record.status){
        case AssignmentStatus.Pending:
            return <p>未着手</p>
        case AssignmentStatus.Registered:
            return <p>登録済</p>
        case AssignmentStatus.Completed:
            return <p>完了</p>
        default:
            return <></>
    }
}

const AssignmentEntry = ({record}:AssignmentEntryProps)=>{
    return <div key={record.id}>
        <h1>{record.title}({record.id})</h1>
        <p>{parse(record.description)}</p>
        <p>{record.course_name}({record.course_id})</p>
        <button onClick={()=>{registerOneRecord(record);}}>課題を登録</button>
        <RecordStateDisplay record={record}/>
        <RecordStateSetter record={record}/>
        <AssignmentDurationSetter record={record}/>
    </div>
}

export const AssignmentList = ()=>{
    let [records, setRecords] = useState<AssignmentRecord[]>(allRecordsVault.all());
    
    useEffect(() => {//初回のみ実行
        allRecordsVault.addVaultUpdateListener(async (_) => {
            setRecords(allRecordsVault.all());
        })
    },[]);

    return <div>
            {records.map((record) => {
                return <AssignmentEntry record={record} />
            })}
        </div>;
}
