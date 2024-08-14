import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { signalTerminal,Signal,SignalState,signalHandler} from './signal';

import { vaultCatchUpInterval } from '../vault/vault';

describe("signal",()=>{
    it("should be defined",()=>{
        expect(signalTerminal).toBeDefined();
    })
    it("shoud be transceived",async ()=>{
        let senderRecognizedStateChange = 0;
        const outer = {state: SignalState.INNACTIVE};
        signalTerminal.addSignalStateListener(Signal.AuthURLShown,(state)=>{
            outer.state = state;
            senderRecognizedStateChange++;
        })
        let signalReceived = 0;
        signalHandler.setSignalHandler(Signal.AuthURLShown,async ()=>{
            await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*3));
            signalReceived++;
        })

        expect(outer.state).toBe(SignalState.INNACTIVE);

        signalTerminal.send(Signal.AuthURLShown);

        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSING);
    
        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSED);

        expect(senderRecognizedStateChange).toBeGreaterThanOrEqual(1);
        expect(signalReceived).toBeGreaterThanOrEqual(1);


        signalTerminal.send(Signal.AuthURLShown);

        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSING);
    
        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSED);

    });
})