import { AssignmentRecord, AssignmentRecordVault } from "../assignmentRecord";
import { endpoint } from "./endpoint";

describe('endpoints', () => {
    it('should have access to getAuthFlowState', async () => {
        let res = await endpoint.getAuthFlowState();
        // console.log(res);
        // console.log(document.cookie);
    });
    it('should have access to getTokens', async () => {
        let res = await endpoint.getTokens();
        // console.log(res);
        // console.log(document.cookie);
    });
    it('should have access to refreshTokens', async () => {
        let res = await endpoint.refreshTokens();
        // console.log(res);
        // console.log(document.cookie);
    });
    it('should have access to revokeTokens', async () => {
        let res = await endpoint.revokeTokens();
        // console.log(res);
        // console.log(document.cookie);
    });
});