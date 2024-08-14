import { Temporal } from "temporal-polyfill";
import { settingVault } from "../setting";
import { v4 as uuidv4 } from 'uuid';
import { Record } from "../record";
import { AssignmentRecordVault } from "./assignmentRecordVault";

export enum AssignmentStatus {
    Completed = 2,
    Registered = 1,
    Pending = 0
}

export type AssignmentRecordStruct = {
    id?: string;
    title?: string;
    description?: string;
    dueDate?: Temporal.ZonedDateTime;
    course_name?: string;
    course_id?: string;
    duration?: Temporal.Duration;
    status?: AssignmentStatus;
}

export const AssignmentRecordFields = [
    "id","title","description","dueDate","course_name","course_id","duration","status"
];

export class AssignmentRecord{
    private _record: Record;
    get record(): Record {return this._record;}

    constructor(record: Record){
        this._record = record;
    }

    static parseObj(assignmentRecordVault: AssignmentRecordVault, obj: AssignmentRecordStruct){
        let id = obj.id??uuidv4();
        let title = obj.title??"";
        let description = obj.description??"";
        let dueDate = obj.dueDate??Temporal.Now.zonedDateTimeISO("UTC");
        let course_name = obj.course_name??"";
        let course_id = obj.course_id??"";
        let duration = obj.duration??settingVault.defaultAssignmentDuration;
        let status = obj.status??AssignmentStatus.Pending;
        
        let _record = new Record(assignmentRecordVault.recordVault, [id,title,description,dueDate,course_name,course_id,duration,status]);

        return new AssignmentRecord(_record);
    }

    get id():string {return this._record.get('id');}
    get title():string {return this._record.get('title');}
    get description():string {return this._record.get('description');}
    get dueDate():Temporal.ZonedDateTime {return Temporal.ZonedDateTime.from(this._record.get('dueDate'));}
    get course_name():string {return this._record.get('course_name');}
    get course_id():string {return this._record.get('course_id');}
    get duration():Temporal.Duration {return Temporal.Duration.from(this._record.get('duration'));}
    get status():AssignmentStatus {return this._record.get('status') as AssignmentStatus;}
    
    set id(val: string) { this._record.set('id', val);}
    set title(val: string) { this._record.set('title', val);}
    set description(val: string) { this._record.set('description', val);}
    set dueDate(val: Temporal.ZonedDateTime) { this._record.set('dueDate', val);}
    set course_name(val: string) { this._record.set('course_name', val);}
    set course_id(val: string) { this._record.set('course_id', val);}
    set duration(val: Temporal.Duration) { this._record.set('duration', val);}
    set status(val: AssignmentStatus) { this._record.set('status', val);}

    asObj() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            course_name: this.course_name,
            course_id: this.course_id,
            duration: this.duration,
            status: this.status
        };
    }

    markAsCompleted(){
        this._record.set('status', AssignmentStatus.Completed);
    }

    markAsRegistered(){
        this._record.set('status', AssignmentStatus.Registered);
    }

    markAsPending(){
        this._record.set('status', AssignmentStatus.Pending);
    }

    isCompleted(){
        return this._record.get('status') === AssignmentStatus.Completed;
    }

    isRegistered(){
        return this._record.get('status') === AssignmentStatus.Registered;
    }

    isPending(){
        return this._record.get('status') === AssignmentStatus.Pending;
    }

    unwrap(){
        return this._record.unwrap();
    }
};