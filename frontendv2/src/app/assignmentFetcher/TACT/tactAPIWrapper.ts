import { LMS } from '../../setting';
import { LMS_URLS } from '../data';
import {
  AssignmentListResponseNotation,
  FavoritesListResponseNotation,
  SiteListResponseNotation,
  SiteCourseIDResponseNotation as CourseDetailResponseNotation,
} from './type';
import { AssignmentRecordStruct } from '../../assignmentRecord/assignmentRecord';
import { Temporal } from 'temporal-polyfill';

class TACTAPIWrapper {
  static baseUrl = LMS_URLS[LMS.NuTACT];

  private async fetch(endpoint: string) {
    const response = await fetch(TACTAPIWrapper.baseUrl + endpoint);
    return await response.json();
  }

  async allAssignments() {
    return (await this.fetch('/direct/assignment/my.json')) as AssignmentListResponseNotation;
  }
  async favoriteCourses() {
    return (await this.fetch('/portal/favorites/list')) as FavoritesListResponseNotation;
  }
  async courseDetail(courseId: string) {
    return (await this.fetch(`/direct/site/${courseId}.json`)) as CourseDetailResponseNotation;
  }
  async allCourses() {
    return (await this.fetch('/direct/site.json')) as SiteListResponseNotation;
  }
}

//シングルトン
export const tactAPI = new TACTAPIWrapper();

class TACTAPIExploiter {
  api: TACTAPIWrapper;
  constructor(api: TACTAPIWrapper) {
    this.api = api;
  }

  async allAssignments(): Promise<AssignmentRecordStruct[]> {
    const json = await this.api.allAssignments();
    const assignments: Promise<AssignmentRecordStruct>[] = json.assignment_collection.map(async (assignment) => {
      const course = await this.api.courseDetail(assignment.context);
      return {
        id: assignment.id,
        title: assignment.entityTitle,
        description: assignment.instructions,
        course_id: course.id,
        course_name: course.title,
        dueDate: Temporal.ZonedDateTime.from(assignment.dropDeadTimeString),
      };
    }); //コルーチンのリスト
    return await Promise.all(assignments); //オブジェクトのリストに
  }
}

//シングルトン
export const tactDataHandler = new TACTAPIExploiter(tactAPI);
