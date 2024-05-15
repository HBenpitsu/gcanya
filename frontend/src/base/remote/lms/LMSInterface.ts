import { Assignment } from "../../../data/assignments";
import { UserEnvironment } from "../../../data/userInformation";
import { LMS } from "../../../data/consts";
import { LMSMock } from "./mock";

export interface LMSInterface {
    fetchAssignmentList(): Promise<Assignment[]>;
}

export class LMSHandler{
    constructor(private LMS: LMSInterface) {}

    static new(env: UserEnvironment) {
        switch (env.usginLMS) {
            case LMS.TACT:
                return new LMSHandler(new LMSMock());
            case LMS.NU_MOODLE:
                return new LMSHandler(new LMSMock());
        }
    }

    async fetchAssignmentList(): Promise<Assignment[]> {
        return await this.LMS.fetchAssignmentList();
    }
}