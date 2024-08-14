import { Temporal } from 'temporal-polyfill';

export type Assignment = {
    CourseName: string;
    Title: string;
    DueDate: Date;
    description: string|null;
}
export type AssignmentRecord = {
    assignment: Assignment;
    duration: Temporal.Duration|null;
    is_registered: boolean;
}
export class AssignmentRegisterCommand{
    course_name:str;
    title_of_assignment:str;
    dueDate:Date;
    duration:number;//total seconds
    description:str|null;
    constructor(assignmentRecord:AssignmentRecord){
        if (assignmentRecord.duration === null){
            throw new Error("Assignment duration is not set yet.: "+assignmentRecord.assignment.Title);
        }
        this.course_name = assignmentRecord.assignment.CourseName;
        this.title_of_assignment = assignmentRecord.assignment.Title;
        this.dueDate = assignmentRecord.assignment.DueDate;
        this.duration = assignmentRecord.duration.total("seconds");
        this.description = assignmentRecord.assignment.description;
    }
}