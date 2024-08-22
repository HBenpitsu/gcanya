export { AssignmentRecord } from './assignmentRecord';

import { AssignmentRecordVault } from './assignmentRecordVault';
export const registerationQueue = new AssignmentRecordVault('registerationQueue');
export const allRecordsVault = new AssignmentRecordVault('allRecordsVault');
