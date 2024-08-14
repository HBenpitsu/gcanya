import { Record, RecordVault } from "../record";
import { AssignmentRecord, AssignmentRecordFields, AssignmentRecordStruct, AssignmentStatus } from "./assignmentRecord";
import { Temporal } from "temporal-polyfill";

export class AssignmentRecordVault{
    protected _recordVault: RecordVault;
    get recordVault() {
        return this._recordVault;
    }

    constructor(id:string = ""){
        this._recordVault = new RecordVault(AssignmentRecordFields, 'assignmentRecord'+id);
    }

    addVaultUpdateListener( callback: (value: string)=>Promise<void> ) {
        this._recordVault.addVaultUpdateListener( callback );
    }

    push( obj: AssignmentRecordStruct ) {
        // 初期化をAssignmentRecordで行うため，recordを直接作らず，AssignmentRecord.parseObjを使う．
        let asrec =  AssignmentRecord.parseObj( this, obj );
        this._recordVault.push( asrec.record );
    }

    filter( callback: ( rec: AssignmentRecord )=>boolean ) {
        return this._recordVault
        .filter( 
            rec => callback( new AssignmentRecord(rec) )
        )
        .map(
            rec => new AssignmentRecord(rec)
        );
    }

    all() {
        return this._recordVault
        .all()
        .map( 
            rec => new AssignmentRecord(rec) 
        );
    }

    drop( callback: ( rec: AssignmentRecord )=>boolean ) {
        this._recordVault.drop( 
            (rec: Record) => callback( new AssignmentRecord(rec)) 
        );
    }

    sortInDueDate(rev: boolean = false) {
        const mul = rev ? (-1) : (1);
        return this._recordVault.sort(
            (a: Record, b: Record) => a.get('dueDate') > b.get('dueDate') ? mul*(1) : mul*(-1)
        );
    }

    sortInStatus(rev: boolean = false) {
        const mul = rev ? (-1) : (1);
        return this._recordVault.sort(
            (a: Record, b: Record) => mul*(a.get('status') - b.get('status'))
        );
    }

    sortInTitle(rev: boolean = false) {
        const mul = rev ? (-1) : (1);
        return this._recordVault.sort(
            (a: Record, b: Record) => a.get('title') > b.get('title') ? mul*(1) : mul*(-1)
        );
    }

    clear() {
        this._recordVault.clear();
    }
}