import { RecordVault } from "./recordVault";

export class Record{
    protected recordVault: RecordVault;
    protected values: any[];

    constructor( recordVault: RecordVault, values: any[] ) {
        this.recordVault = recordVault;
        this.values = values;
    }

    static parseStr( recordVault: RecordVault, values: string ) {
        const parsed_values = JSON.parse(values);
        let record = new Record(recordVault, parsed_values);
        return record;
    }

    static parseObj( recordVault: RecordVault, obj: any ) {
        let values: any[] = [];
        for (let key of recordVault.fields) {
            values.push(obj[key]);
        }
        return new Record(recordVault, values);
    }

    get( field: string ) {
        const index = this.recordVault.fields.indexOf(field);
        if (index === -1) {
            throw new Error('Field not found');
        }
        return this.values[index];
    }

    set( field: string, value: any ) {
        const index = this.recordVault.fields.indexOf(field);
        if (index === -1) {
            throw new Error('Field not found');
        } else {
            this.values[index] = value;
        }
        this.recordVault.dump();
    }

    unwrap() {
        return this.values;
    }
}