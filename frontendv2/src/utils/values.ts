export const isDev = process.env.NODE_ENV === 'development';

export enum LMS {
  UNDEFINED = '',
  NuTACT = 'NuTACT',
  NuMoodle = 'NuMoodle',
}

//settingVault
export const Interval_ForComponents_ToSyncWithVault_InMilliSec = 10;
export const Interval_ForVault_ToCatchUpWithStorage_InMilliSec = 10;

//assignmentFetcher
export const LMS_URLS = {
  [LMS.UNDEFINED]: '',
  [LMS.NuTACT]: 'https://tact.ac.thers.ac.jp',
  [LMS.NuMoodle]: 'https://example.com',
};
