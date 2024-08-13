
export class Record{
    public fields: string[];
    public values: any[];

    constructor( fields: string[], values: any[] ) {
        this.fields = fields;
        this.values = values;
    }

    static parseStr( record_string: string ) {
        const obj = JSON.parse(record_string);
        let record = new Record(obj.fields, obj.values);
        return record;
    }

    static parseObj( obj: any ) {
        let fields: string[] = [];
        let values: any[] = [];
        for (const key in obj) {
            fields.push(key);
            values.push(obj[key]);
        }
        return new Record(fields, values);
    }

    dump() {
        return JSON.stringify({
            fields: this.fields,
            values: this.values,
        });
    }

    get( field: string ) {
        const index = this.fields.indexOf(field);
        if (index === -1) {
            throw new Error('Field not found');
        }
        return this.values[index];
    }

    set( field: string, value: any ) {
        const index = this.fields.indexOf(field);
        if (index === -1) {
            throw new Error('Field not found');
        } else {
            this.values[index] = value;
        }
    }

    asObj<T>( obj: T ): T {
        for (const key in obj) {
            obj[key] = this.get(key);
        }
        return obj;
    }
}