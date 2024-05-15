export default class TaskEntry {
  readonly id: string;
  readonly title: string;
  readonly openTime: Date;
  readonly dueDate: Date;
  readonly courseName: string;
  readonly courseId: string;
  constructor(
    id: string,
    title: string,
    openTime: Date,
    dueDate: Date,
    courseName: string,
    courseId: string
  ) {
    this.id = id;
    this.title = title;
    this.courseName = courseName;
    this.courseId = courseId;
    this.dueDate = dueDate;
    this.openTime = openTime;
  }
  toJson() {
    return {
      id: this.id,
      title: this.title,
      openTime: this.openTime.toJSON(),
      dueDate: this.dueDate.toJSON(),
      courseName: this.courseName,
      courseId: this.courseId,
    };
  }
}
