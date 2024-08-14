import { settingVault } from './settingVault';
import { useState,useEffect } from 'react';

export const useLMSList = ()=>{

    const [usingLMSList, setUsingLMSList] = useState(settingVault.LMSList);
    useEffect(//初回レンダリング時のみ実行。
        ()=>{settingVault.addLMSListUpdateListener(async (list)=>{setUsingLMSList(list)});},[]
    );
    return usingLMSList;
}

export const useUITheme = ()=>{
    const [uiTheme, setUiTheme] = useState(settingVault.uiTheme);
    useEffect(//初回レンダリング時のみ実行。
        ()=>{settingVault.addUIThemeUpdateListener(async (theme)=>{setUiTheme(theme)});},[]
    );
    return uiTheme;
}

export const useDefaultAssignmentDuration = ()=>{
    const [defaultAssignmentDuration, setDefaultAssignmentDuration] = useState(settingVault.defaultAssignmentDuration);
    useEffect(//初回レンダリング時のみ実行。
        ()=>{settingVault.addDefaultAssignmentDurationUpdateListener(async (duration)=>{setDefaultAssignmentDuration(duration)});},[]
    );
    return defaultAssignmentDuration;
}