import { Record } from './record';
import { vault } from '../vault';

const recordVaultKey = 'recordVaultKey';
const valuesKey = 'ForValuesOf';
const fieldsKey = 'ForFieldsOf';

export class RecordVault {
    protected _fields: string[] = [];
    get fields() { return this._fields; }
    private _recordList: Record[] = [];
    protected recordValueVaultId: string = "";

    constructor(fields: string[],recordVaultId: string) {
        this.recordValueVaultId = recordVaultKey+valuesKey+recordVaultId;
        this._fields = fields;

        vault.setDefault(this.recordValueVaultId, "[]");

        this.addVaultUpdateListener(
            async (vaultString) => {
            this._recordList = 
                JSON
                .parse(vaultString)
                .map((values: any[]) => new Record(this, values))
            }
        );
        
        this._recordList = 
            JSON
            .parse(vault.fetch(this.recordValueVaultId))
            .map((values: any[]) => new Record(this, values));
    }

    addVaultUpdateListener( callback: (value: string)=>Promise<void> ) {
        vault.addUpdateListener(this.recordValueVaultId, callback);
    }

    push( record: Record ) {
        this._recordList.push(record);
        this.dump();
    }

    pushObj( obj: any ) {
        this.push(Record.parseObj(this, obj));
    }

    filter( callback: ( rec: Record )=>boolean ) {
        return this._recordList.filter(callback);
    }

    all() {
        return this._recordList;
    }

    sort( callback: ( a: Record, b: Record )=>number ) {
        this._recordList.sort(callback);
        this.dump();
    }

    drop( callback: ( rec: Record )=>boolean ) {
        this._recordList = this._recordList.filter((rec: Record) => !callback(rec));
        this.dump();
    }

    clear() {
        this._recordList = [];
        this.dump();
    }

    dump() {        
        vault.set(
            this.recordValueVaultId, 
            JSON.stringify(
                this._recordList.map(rec => rec.unwrap())
            )
        );
    }
}
