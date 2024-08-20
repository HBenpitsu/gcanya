import { describe,it,expect } from '@jest/globals';
import { OAuthSig, showAuthURLSig, registerSig, SignalState } from '.';
import { vaultCatchUpInterval } from '../vault/vault';

describe("signal",()=>{
    it("should be defined",()=>{
        expect(OAuthSig).toBeDefined();
    })
    it("shoud be transceived",async ()=>{
        let recognizedStateChange = 0;
        const outer = {state: SignalState.INNACTIVE};
        OAuthSig.addSignalChangedListener(async (state)=>{
            outer.state = state;
            recognizedStateChange++;
        });
        let signalReceived = 0;
        OAuthSig.setSignalHandler(async ()=>{
            await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*3));
            signalReceived++;
        })

        expect(outer.state).toBe(SignalState.INNACTIVE);

        OAuthSig.send();

        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSING);
    
        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSED);
        
        expect(recognizedStateChange).toBeGreaterThanOrEqual(1);
        expect(signalReceived).toBeGreaterThanOrEqual(1);


        OAuthSig.send();

        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSING);
    
        await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
        expect(outer.state).toBe(SignalState.PROCESSED);

    });
})