export const isDev = process.env.NODE_ENV === 'development';

export enum LMS {
  UNDEFINED = '',
  NuTACT = 'NuTACT',
  NuMoodle = 'NuMoodle',
}

//vault
export const vaultCatchUpInterval = 100;

//assignmentFetcher
export const LMS_URLS = {
  [LMS.UNDEFINED]: '',
  [LMS.NuTACT]: 'https://tact.ac.thers.ac.jp',
  [LMS.NuMoodle]: 'https://example.com',
};
