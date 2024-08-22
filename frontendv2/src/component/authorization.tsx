import { useEffect, useState } from "react";
import { foreground as authorizer } from "../app/backendWrapper/authorizer";
import { OAuthSig, showAuthURLSig, SignalState } from "../app/signalv2";
import { authorizedFlag as authFlag } from "../app/flag";

type ActiveChipProps = {
    href: URL;
};

const ActiveChip = ({href}: ActiveChipProps) => {
    return <button onClick={()=>{
        window.open(href.toString(), 'blank', '');
    }}>認証待ち (クリックして認証)</button>;
};

const PendingChip = () => {
    return <div>処理中...</div>;
};

const InactiveChip = () => {
    return <button onClick={()=>{
        authorizer.authorize();
    }}>認証非アクティブ (クリックしてアクティベート) </button>;
};

export const AuthChip = () => {
    // OAuthSigの状態によって表示を切り替えるため
    let [OAuthState, setOAuthState] = useState<SignalState>(OAuthSig.observe());
    // 表示されるべきauthURLを取得できるか否かで表示を切り替えるため．
    let [authURLisSet, setAuthURLisSet] = useState(true);
    // backgroundプロセスからauthURLを取得するため．
    let [authURL, setAuthURL] = useState<string|null>(authorizer.getAuthURL());
    
    useEffect(() => {//初回のみ実行する．
        OAuthSig.addSignalChangedListener(async (state) => {
            setOAuthState(state);
            if (state == SignalState.UNPROCESSED || state == SignalState.PROCESSING){
                setAuthURLisSet(false);
            }
        });
        showAuthURLSig.setSignalHandler(async ()=> {
            setAuthURL(await authorizer.getAuthURL());
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

export const AuthFlagChip = () => {
    // googleのOAuthが完了されているか否かを表示する
    let [authFlagState, setAuthFlagState] = useState<boolean>(authFlag.isOn());
    
    useEffect(() => {//初回のみ実行
        authFlag.addFlagChangedListener(async (flag) => {
            setAuthFlagState(flag);
        });
    }, []);

    if (authFlagState) {
        return <>認証済み</>
    } else {
        return <>未認証</>
    }
}