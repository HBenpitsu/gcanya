import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { signalSender,Signal,SignalState,signalReceiver} from './signal';

import { vaultCatchUpInterval } from '../../utils';

describe("signal",()=>{
    it("should be defined",()=>{
        expect(signalSender).toBeDefined();
    })
    it("shoud be transceived",async ()=>{
        let senderRecognizedStateChange = 0;
        const outer = {state: SignalState.INNACTIVE};
        signalSender.addSignalStateListener(Signal.OAuth,(state)=>{
            outer.state = state;
            senderRecognizedStateChange++;
        })
        let signalReceived = 0;
        signalReceiver.setSignalHandler(Signal.OAuth,async ()=>{
            await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*3));
            signalReceived++;
        })

        expect(outer.state).toBe(SignalState.INNACTIVE);

        signalSender.send(Signal.OAuth);

        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSING);
    
        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSED);

        expect(senderRecognizedStateChange).toBeGreaterThanOrEqual(1);
        expect(signalReceived).toBeGreaterThanOrEqual(1);


        signalSender.send(Signal.OAuth);

        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSING);
    
        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSED);

    });
})