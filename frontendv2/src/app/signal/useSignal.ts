import { Signal,SignalState,signalTerminal } from './signal';
import { useState,useEffect } from 'react';

export function useOAuthSignal(): [SignalState, ()=>void]{
    const [signalState, setSignalState] = useState(SignalState.INNACTIVE);
    useEffect(//初回レンダリング時のみ実行。
        ()=>{signalTerminal.addSignalStateListener(Signal.AuthURLShown, (state)=>{setSignalState(state)});},[]
    );
    return [signalState, ()=>{signalTerminal.send(Signal.AuthURLShown);}];
}
