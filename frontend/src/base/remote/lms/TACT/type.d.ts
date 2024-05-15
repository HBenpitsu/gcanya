type AttachmentType = {
  name: string;
  ref: string;
  size: number;
  type: string;
  url: string;
};

type AssignmentType = {
  access: string;
  allPurposeItemText: null | string;
  allowPeerAssessment: boolean;
  attachments: AttachmentType[];
  author: string;
  authorLastModified: string;
  closeTime: {
    epochSecond: number;
    nano: number;
  };
  closeTimeString: string;
  content: null | string;
  context: string;
  creator: null | string;
  dropDeadTime: {
    epochSecond: number;
    nano: number;
  };
  dropDeadTimeString: string;
  dueTime: {
    epochSecond: number;
    nano: number;
  };
  dueTimeString: string;
  gradeScale: string;
  gradeScaleMaxPoints: null | number;
  gradebookItemId: number;
  gradebookItemName: string;
  groups: string[];
  id: string;
  instructions: string;
  maxGradePoint: string;
  modelAnswerText: null;
  openTime: {
    epochSecond: number;
    nano: number;
  };
  openTimeString: string;
  position: number;
  privateNoteText: null | string;
  section: string;
  status: string;
  submissionType: string;
  timeCreated: {
    epochSecond: number;
    nano: number;
  };
  timeLastModified: {
    epochSecond: number;
    nano: number;
  };
  title: string;
  allowResubmission: boolean;
  anonymousGrading: boolean;
  draft: boolean;
  entityReference: string;
  entityURL: string;
  entityId: string;
  entityTitle: string;
};

export type AssignmentResponseType = {
  entryPrefix: 'assignment';
  assignment_collection: AssignmentType[];
};

type SiteID = string;

type SitePageType = {
  id: string;
  layout: number;
  layoutTitle: string;
  position: number;
  props: {
    'sitePage.customTitle': string;
  } | null;
  reference: string;
  siteId: string;
  skin: string;
  title: string;
  titleCustom: boolean;
  url: string;
  activeEdit: boolean;
  homePage: boolean;
  popUp: boolean;
};

export type SiteType = {
  contactEmail: null | string;
  contactName: null | string;
  createdDate: number;
  createdTime: {
    display: string;
    time: number;
  };
  description: string;
  htmlDescription: string;
  htmlShortDescription: string;
  iconUrl: null | string;
  iconUrlFull: null | string;
  id: SiteID;
  infoUrl: null | string;
  infoUrlFull: null | string;
  joinerRole: null | string;
  lastModified: number;
  maintainRole: string;
  modifiedDate: number;
  modifiedTime: {
    display: string;
    time: number;
  };
  owner: string;
  props: {
    'contact-name': string;
    'site.manage.membership.unjoinables': string;
  };
  providerGroupId: null | string;
  realmLock: {
    declaringClass: string;
  };
  realmLocks: [];
  reference: string;
  shortDescription: string;
  siteGroups: null | string;
  siteOwner: {
    userDisplayName: string;
    userEntityURL: string;
    userId: string;
  };
  sitePages: SitePageType[];
  skin: null | string;
  softlyDeletedDate: null | string;
  title: string;
  type: string;
  userRoles: string[];
  activeEdit: boolean;
  customPageOrdered: boolean;
  empty: boolean;
  joinable: boolean;
  pubView: boolean;
  published: boolean;
  softlyDeleted: boolean;
  entityReference: string;
  entityURL: string;
  entityId: string;
  entityTitle: string;
};

export type SiteResponseType = {
  entryPrefix: 'site';
  site_collection: SiteType[];
};

export type FavoritesListResponseType = {
  autoFavoritesEnabled: boolean;
  favoriteSiteIds: SiteID[];
};

export type SiteCourseIDResponseType = {
  contactEmail: null | string;
  contactName: null | string;
  createdDate: number;
  createdTime: {
    display: string;
    time: number;
  };
  description: string;
  htmlDescription: string;
  htmlShortDescription: string;
  iconUrl: null | string;
  iconUrlFull: null | string;
  id: SiteID;
  infoUrl: null | string;
  infoUrlFull: null | string;
  joinerRole: null | string;
  lastModified: number;
  maintainRole: string;
  modifiedDate: number;
  modifiedTime: {
    display: string;
    time: number;
  };
  owner: string;
  props: {
    'site.manage.membership.unjoinables': string;
  };
  providerGroupId: null | string;
  realmLock: {
    declaringClass: string;
  };
  realmLocks: [];
  reference: string;
  shortDescription: string;
  siteGroups: null | string;
  siteOwner: {
    userDisplayName: string;
    userEntityURL: string;
    userId: string;
  };
  sitePages: SitePageType[];
  skin: null | string;
  softlyDeletedDate: null | string;
  title: string;
  type: string;
  userRoles: string[];
  activeEdit: boolean;
  customPageOrdered: boolean;
  empty: boolean;
  joinable: boolean;
  pubView: boolean;
  published: boolean;
  softlyDeleted: boolean;
  entityReference: string;
  entityURL: string;
  entityId: string;
  entityTitle: string;
};
