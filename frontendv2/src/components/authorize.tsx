import { useEffect, useState } from "react";
import { getAuthURL } from "../app/assignmentRegisterer/authorizer";
import { signalTerminal,Signal, signalHandler, SignalState } from "../app/signal";
import { checkIfAuthorized } from "../app/assignmentRegisterer/authorizer";

const useAuthTip = () => {
    let [oAuthState, setOAuthState] = useState<SignalState>();
    let [authURLShownState, setAuthURLShownState] = useState<SignalState>();
    
    useEffect(() => {//初回のみ実行する．
        signalTerminal.addSignalStateListener(
            Signal.OAuth, (state) => {
                setOAuthState(state);
            }
        );
        signalTerminal.addSignalStateListener(
            Signal.AuthURLShown, (state) => {
                setAuthURLShownState(state);
            }
        );
    }, []);

    if (
        oAuthState == SignalState.INNACTIVE 
        || oAuthState == SignalState.PROCESSED
    ) {
        if (checkIfAuthorized()){
            return <div className="authorized" onClick={()=>{
                signalTerminal.send(Signal.OAuth);
            }}>
            </div>;
        } else {
            return <div className="unauthorized" onClick={()=>{
                signalTerminal.send(Signal.OAuth);
            }}></div>;
        }
    } else if (
        oAuthState == SignalState.UNPROCESSED
        || oAuthState == SignalState.PROCESSING
    ) {
        if (
            authURLShownState == SignalState.UNPROCESSED
            || authURLShownState == SignalState.PROCESSING
        ) {
            return <div className="auth_code_should_be_signed" onClick={
                ()=>{ signalTerminal.send(Signal.AuthURLShown); }
            }></div>;
        } else if (
            authURLShownState == SignalState.INNACTIVE
            || authURLShownState == SignalState.PROCESSED
        ) {
            return <div className="unauthorized"></div>;
        }
    }
};
