import { fetcher } from './fetcher';
import {
  FavoritesListResponseType,
  SiteCourseIDResponseType,
  SiteID,
  SiteResponseType,
} from './type';

export const getFavoriteCoursesIds = async (): Promise<SiteID[]> => {
  const data = (await fetcher.fetch('/portal/favorites/list')) as FavoritesListResponseType;
  return data.favoriteSiteIds;
};

// response.data
//  {
//     "favoriteSiteIds": [
//         "n_2024_A_ZZ2404090014",
//         "n_2024_1002250",
//         "n_2024_1002240",
//         "n_2024_1001329",
//         "n_2024_1001209",
//         "n_2024_1001119",
//         "n_2024_1001069",
//         "n_9999_Z_ZZ333333",
//         "n_2023_A_ZZ2304060013",
//         "n_2023_T_102305080003"
//     ],
//     "autoFavoritesEnabled": true
// }

export const getRawCourse = async (courseId: SiteID): Promise<SiteCourseIDResponseType> => {
  const data = (await fetcher.fetch(`/direct/site/${courseId}.json`)) as SiteCourseIDResponseType;
  return data;
};

export const getAllCourses = async (): Promise<CourseEntry[]> => {
  const data = (await fetcher.fetch('/direct/site.json')) as SiteResponseType;
  if (data.site_collection === undefined) {
    return [];
  }

  const courseList = data.site_collection.map<CourseEntry>((course) => {
    return new CourseEntry(course.entityId, course.entityId);
  });
  return courseList;
};

export default class CourseEntry {
  readonly id: string;
  readonly name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
