import { cleanup, render, screen, act } from '@testing-library/react';
import React, { useContext,FC } from 'react';
import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { vaultCatchUpInterval } from '../vault/vault';
import { useLMSList,useDefaultAssignmentDuration,useUITheme } from './useSetting';
import { settingVault } from './settingVault';
import { LMS, UITheme } from './settings';

describe('useSetting functions ', () => {
    it('should be defined', () => {
        expect(useLMSList).toBeDefined();
        expect(useDefaultAssignmentDuration).toBeDefined();
        expect(useUITheme).toBeDefined();
    })

    it ('should be able to be used in components', async () => {
        const Child = () => {
            const LMSList = useLMSList();
            const UITheme = useUITheme();
            const defaultAssignmentDuration = useDefaultAssignmentDuration();
            return <div>
                <div>{LMSList}</div>
                <div>{UITheme}</div>
                <div>{defaultAssignmentDuration.toString()}</div>
            </div>
        }
        render(<Child />);
        await act (async () => {
            settingVault.addLMS(LMS.NuTACT);
            await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*2));
        });
        screen.findByText(settingVault.LMSList[0]);
        screen.findByText(settingVault.uiTheme);
        screen.findByText(settingVault.defaultAssignmentDuration.toString());

        await act (async () => {
            settingVault.addLMS(LMS.NuMoodle);
            settingVault.removeLMS(LMS.NuTACT);
            settingVault.uiTheme = UITheme.dark;
            settingVault.defaultAssignmentDuration = settingVault.defaultAssignmentDuration.add({minutes: 60});
            await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*2));
        });
        screen.findByText(settingVault.LMSList[0]);
        screen.findByText(settingVault.uiTheme);
        screen.findByText(settingVault.defaultAssignmentDuration.toString());
    })
})