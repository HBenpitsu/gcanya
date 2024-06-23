import { ReactNode,FC,useContext,createContext,useState,useCallback,useMemo, useEffect, useRef } from 'react';
import { settingVault } from './storageAccess';
import { LMS, Interval_ForComponents_ToSyncWithVault_InMilliSec } from '../../utils';

type Props = {
    children: ReactNode;
}

export const colorThemeContext = createContext<string>('');
export const currentLMSContext = createContext<LMS>(LMS.UNDEFINED);
export const usingLMSContext = createContext<LMS[]>([]);
export const defaultDurationOfAssignmentInMinContext = createContext<number>(0);

export const UseSettingVault:FC<Props> = ({children}) => {
    console.debug('UseSettingVault is rendered.');

    const [colorTheme,setColorThemeState] = useState<string>('');
    const [currentLMS,setCurrentLMSState] = useState<LMS>(LMS.UNDEFINED);
    const [usingLMS,setUsingLMSState] = useState<LMS[]>([]);
    const [defaultDurationOfAssignmentInMin,setDefaultDurationOfAssignmentInMinState] = useState<number>(0);

    //初回レンダリング時に一度だけ実行されて、settingVaultの値を取得し、同時にcatchUpの定期実行を開始する。
    //実際にcatchUpが必要と判定される(catchUpの戻り値がtrue)、もしくはsetterが呼び出されるとsettingVault.updatedAt()が変わるので、それを監視する
    useEffect(()=>{

        /*全てのステートを更新する関数。
        この関数を実行することについて、パフォーマンス上の問題はあまりない。
        なぜなら、この関数を実行することで、全てのステートが更新されるが、
        値に変更がないステートは再レンダリングを基本的にはトリガーしないからである。
        参考: https://zenn.dev/uniformnext/articles/9afc9e588d61ed 
        */
        function syncAllStateWithSettingVault(){
            setColorThemeState(settingVault.getColorTheme());
            setCurrentLMSState(settingVault.getCurrentLMS());
            setUsingLMSState(settingVault.getUsingLMS());
            setDefaultDurationOfAssignmentInMinState(settingVault.getDefaultDurationOfAssignmentInMin());
        }

        //初回実行
        syncAllStateWithSettingVault();

        //定期実行
        let lastStamp = '';
        const catchUp = ()=>{
            if (lastStamp !== settingVault.updatedAt()){
                syncAllStateWithSettingVault();
                lastStamp = settingVault.updatedAt();
            }
        }
        setInterval(catchUp,Interval_ForComponents_ToSyncWithVault_InMilliSec);
    },[]);

    return (
        <colorThemeContext.Provider value={colorTheme}>
        <currentLMSContext.Provider value={currentLMS}>
        <usingLMSContext.Provider value={usingLMS}>
        <defaultDurationOfAssignmentInMinContext.Provider value={defaultDurationOfAssignmentInMin}>
        {children}
        </defaultDurationOfAssignmentInMinContext.Provider>
        </usingLMSContext.Provider>
        </currentLMSContext.Provider>
        </colorThemeContext.Provider>
    );

}