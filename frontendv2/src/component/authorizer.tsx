import { useEffect, useState } from "react";
import { getAuthURL } from "../app/assignmentRegisterer/authorizer";
import { OAuthSig, showAuthURLSig, SignalState } from "../app/signalv2";

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
        OAuthSig.send();
    }}>認証非アクティブ (クリックしてアクティベート) </button>;
};

export const AuthChip = () => {
    let [OAuthState, setOAuthState] = useState<SignalState>(OAuthSig.observe());
    let [authURL, setAuthURL] = useState<string|null>(getAuthURL());
    let [authURLisSet, setAuthURLisSet] = useState(true);
    
    useEffect(() => {//初回のみ実行する．
        OAuthSig.addSignalChangedListener(async (state) => {
            setOAuthState(state);
            if (state == SignalState.UNPROCESSED || state == SignalState.PROCESSING){
                setAuthURLisSet(false);
            }
        });
        showAuthURLSig.setSignalHandler(async ()=> {
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
