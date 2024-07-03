import { Signal,SignalState,signalSender } from './signal';
import { useState,useEffect } from 'react';

export function useOAuthSignal(): [SignalState, ()=>void]{
    const [signalState, setSignalState] = useState(SignalState.INNACTIVE);
    useEffect(//初回レンダリング時のみ実行。
        ()=>{signalSender.addSignalStateListener(Signal.OAuth, (state)=>{setSignalState(state)});},[]
    );
    return [signalState, ()=>{signalSender.send(Signal.OAuth);}];
}
