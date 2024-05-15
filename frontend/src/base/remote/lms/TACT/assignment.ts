import CourseEntry, { getFavoriteCoursesIds, getRawCourse } from './course';
import { fetcher } from './fetcher';
import TaskEntry from './task';
import { AssignmentResponseType, AssignmentType } from './type';

export const getRawAllAssignments = async (): Promise<AssignmentType[]> => {
  const data = (await fetcher.fetch('/direct/assignment/my.json')) as AssignmentResponseType;
  if (data.assignment_collection === undefined) {
    return [];
  }
  return data.assignment_collection;
};

export const getAssignments = async (): Promise<TaskEntry[]> => {
  const rawAssignments = await getRawAllAssignments();
  const favoriteCourses = await getFavoriteCoursesIds();

  const courses = await Promise.all(
    favoriteCourses.map(async (courseId: string) => {
      const course = await getRawCourse(courseId);
      return new CourseEntry(course.entityId, course.entityTitle);
    })
  );

  const assignments = rawAssignments.map((assignment) => {
    let course = courses.find((course) => course.id === assignment.context);
    if (course === undefined) {
      course = new CourseEntry('unknown', 'unknown');
    }
    const tasks = new TaskEntry(
      assignment.entityId,
      assignment.entityTitle,
      new Date(assignment.openTimeString),
      new Date(assignment.dueTimeString),
      course.name,
      course.id
    );
    return tasks;
  });
  return assignments;
};
