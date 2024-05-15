import { Temporal } from 'temporal-polyfill';
export type Assignment = {
    CourseName: string;
    Title: string;
    DueDate: Date;
    description: string|null;
}
export type AssignmentEntry = {
    assignment: Assignment;
    duration: Temporal.Duration|null;
    is_registered: boolean;
}