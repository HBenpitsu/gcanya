import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { signalSender,Signal,SignalState,signalReceiver } from './signal';
// SignalReceiverはテスト（should avoid conflict）用にexportしていたが、該当部分をコメントアウトしたためもはやその必要はない

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
    });

    // it("should avoid conflict",async ()=>{
    //     const another_receiver1 = new SignalReceiver();
    //     const another_receiver2 = new SignalReceiver();

    //     let another_receiver1_signalReceived = 0;
    //     another_receiver1.setSignalHandler(Signal.OAuth,async ()=>{
    //         another_receiver1_signalReceived++;
    //     })

    //     let another_receiver2_signalReceived = 0;
    //     another_receiver2.setSignalHandler(Signal.OAuth,async ()=>{
    //         another_receiver2_signalReceived++;
    //     })

    //     console.log(another_receiver1_signalReceived,another_receiver2_signalReceived);

    //     signalSender.send(Signal.OAuth);

    //     await new Promise((resolve)=>setTimeout(resolve,vaultCatchUpInterval*2));
    //     console.log(another_receiver1_signalReceived,another_receiver2_signalReceived);

    //     expect(another_receiver1_signalReceived == 0 || another_receiver2_signalReceived == 0).toBeTruthy();
    // }) 同時に呼ばれた場合どちらの同じタイミングで同じstateを渡して呼ばれてしまうので、同一プロセスを用いてテストすることはできない。
})