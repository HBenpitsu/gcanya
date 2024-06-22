import { LMS_URLS, LMS, Assignment } from '../../../utils';
import {
  AssignmentListResponseNotation,
  FavoritesListResponseNotation,
  SiteListResponseNotation,
  SiteCourseIDResponseNotation as CourseDetailResponseNotation,
} from './type';

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

  async allAssignments(): Promise<Assignment[]> {
    const json = await this.api.allAssignments();
    const assignments = json.assignment_collection.map(async (assignment) => {
      const course = await this.api.courseDetail(assignment.context);
      return {
        assignmentId: assignment.id,
        courseName: course.title,
        title: assignment.entityTitle,
        dueDate: new Date(assignment.dropDeadTimeString),
        description: assignment.instructions,
      };
    }); //コルーチンのリスト
    return await Promise.all(assignments); //オブジェクトのリストに
  }
}

//シングルトン
export const tactDataHandler = new TACTAPIExploiter(tactAPI);
