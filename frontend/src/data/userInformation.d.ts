import { Browser,LMS } from "./consts";
export type UserEnvironment = {
    usingBrowser: Browser;
    usingLMS: LMS[];
    currentLMS: LMS;
}
