import { LMSInterface } from "./LMSInterface";
import { Assignment } from "../../../data/assignments";

export class LMSMock implements LMSInterface {
    async fetchAssignmentList() {
        let assignment1: Assignment = {
            CourseName: "Course 1",
            Title: "Assignment 1",
            DueDate: new Date(),
            description: "This is a description"
        }
        let assignment2: Assignment = {
            CourseName: "Course 1",
            Title: "Assignment 2",
            DueDate: new Date(),
            description: null
        }
        let assignment3: Assignment = {
            CourseName: "Course 2",
            Title: "Assignment 3",
            DueDate: new Date(),
            description: null
        }
        return [
            assignment1,assignment2,assignment3
        ]
    }
}