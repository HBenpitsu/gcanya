import { useEffect, useState } from "react";
import { getAuthURL } from "../app/assignmentRegisterer/authorizer";
import { signalTerminal,Signal, signalHandler, SignalState } from "../app/signal";

type ActiveChipProps = {
    href: URL;
};

const ActiveChip = ({href}: ActiveChipProps) => {
    return <button onClick={()=>{
        window.open(href.toString(), "_blank");
    }}>認証待ち (クリックして認証)</button>;
};

const PendingChip = () => {
    return <div>処理中...</div>;
};

const InactiveChip = () => {
    return <button onClick={()=>{
        signalTerminal.send(Signal.OAuth);
    }}>認証非アクティブ (クリックしてアクティベート) </button>;
};

export const AuthChip = () => {
    let [OAuthState, setOAuthState] = useState<SignalState>(signalTerminal.observe(Signal.OAuth));
    let [authURL, setAuthURL] = useState<string|null>(getAuthURL());
    let [authURLisSet, setAuthURLisSet] = useState(true);
    
    useEffect(() => {//初回のみ実行する．
        signalTerminal.cancel(Signal.OAuth);
        signalTerminal.addSignalStateUpdateListener(Signal.OAuth, async (state) => {
            setOAuthState(state);
            if (state == SignalState.UNPROCESSED || state == SignalState.PROCESSING){
                setAuthURLisSet(false);
            }
        });
        signalHandler.setSignalHandler(Signal.showAuthURL, async ()=> {
            setAuthURL(await getAuthURL());
            setAuthURLisSet(true);
        });
    }, []);
    switch (OAuthState) {
        case SignalState.UNPROCESSED:
        case SignalState.PROCESSING:
            if (authURLisSet){
                return <ActiveChip href={new URL(authURL!)} />;
            } else {
                return <PendingChip />;
            }
        default:
            return <InactiveChip />;

    }
};
