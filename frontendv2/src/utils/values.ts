export const isDev = process.env.NODE_ENV === 'development';

export enum LMS {
  UNDEFINED = '',
  NuTACT = 'NuTACT',
  NuMoodle = 'NuMoodle',
}

//settingVault
export const Interval_OfSyncComponentsWithStorage_InMilliSec = 10;
export const Interval_OfCatchUpWithLocalStorage_InMilliSec = 10;

//assignmentFetcher
export const LMS_URLS = {
  [LMS.UNDEFINED]: '',
  [LMS.NuTACT]: 'https://tact.ac.thers.ac.jp',
  [LMS.NuMoodle]: 'https://example.com',
};
