import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { signalTransceiver,Signal,SignalState } from './signal';
import { Interval_ForTransciever_ToCheckSignal_InMilliSec } from '../../utils';

describe("signal",()=>{
    it("should be defined",()=>{
        expect(signalTransceiver).toBeDefined();
    })
    it("shoud be sent and processed",async ()=>{

        const interceptor_received = {state:SignalState.PROCESSED};

        const close_interceptor = signalTransceiver.set_signal_interceptor(Signal.AUTHENTICATION,async (ss)=>{
            interceptor_received.state = ss;
            console.log("interceptor is called",ss);
        })
        signalTransceiver.set_signal_handler(Signal.AUTHENTICATION,async ()=>{
            console.log("handler is called");
            await new Promise((resolve) => setTimeout(resolve, 300));
            setTimeout(close_interceptor,Interval_ForTransciever_ToCheckSignal_InMilliSec*3);
        })

        expect(signalTransceiver.send_signal(Signal.AUTHENTICATION)).toBe(SignalState.UNPROCESSED);

        await new Promise((resolve) => setTimeout(resolve, Interval_ForTransciever_ToCheckSignal_InMilliSec*5));

        expect(signalTransceiver.send_signal(Signal.AUTHENTICATION)).toBe(SignalState.PROCESSING);
        expect(interceptor_received.state).toBe(SignalState.PROCESSING);
        
        await new Promise((resolve) => setTimeout(resolve, 400));

        expect(interceptor_received.state).toBe(SignalState.PROCESSED);
    })
})