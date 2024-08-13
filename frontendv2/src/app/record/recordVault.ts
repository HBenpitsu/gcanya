import { Record } from './record';
import { vault } from '../vault';

const recordVaultKey = 'recordVaultKey';

export class RecordVault {
    private _recordList: Record[] = [];
    public recordVaultId: string = "";

    constructor(recordVaultId: string) {
        this.recordVaultId = recordVaultKey+recordVaultId;
        
        vault.setDefault(this.recordVaultId, JSON.stringify([]));

        vault.addUpdateListener(
            this.recordVaultId, 
            async (value) => {
            this._recordList = 
                JSON
                .parse(value)
                .map((record_string: string) => Record.parseStr(record_string))
            }
        );
        
        this._recordList = 
            JSON
            .parse(vault.fetch(this.recordVaultId))
            .map((record_string: string) => Record.parseStr(record_string));
    }

    push( record: Record ) {
        this._recordList.push(record);
        vault.set(
            this.recordVaultId, 
            JSON.stringify(
                this._recordList.map((rec: Record) => rec.dump())
            )
        );
    }

    pushObj( obj: any ) {
        this.push(Record.parseObj(obj));
    }

    filter( callback: ( rec: Record )=>boolean ) {
        return this._recordList.filter(callback);
    }

    all() {
        return this._recordList;
    }

    sort( callback: ( a: Record, b: Record )=>number ) {
        return this._recordList.sort(callback);
    }

    drop( callback: ( rec: Record )=>boolean ) {
        this._recordList = this._recordList.filter((rec: Record) => !callback(rec));
        vault.set(
            this.recordVaultId, 
            JSON.stringify(
                this._recordList.map((rec: Record) => rec.dump())
            )
        );
    }

    clear() {
        this._recordList = [];
        vault.set( this.recordVaultId, "[]" );
    }
}
