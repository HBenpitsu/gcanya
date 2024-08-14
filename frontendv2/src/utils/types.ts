export type Assignment = {
  assignmentId: string;
  title: string;
  courseName: string;
  description: string;
  dueDate: Date;
};

export type AssignmentRecord = {};

export class AssignmentRegisterComand {
  constructor(public assignment: Assignment) {}
}
