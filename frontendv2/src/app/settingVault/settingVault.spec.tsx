import { UseSettingVault, colorThemeContext } from './storageForComponent';
import { cleanup, render, screen, act } from '@testing-library/react';
import React, { useContext,FC } from 'react';
import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import '@testing-library/jest-dom';
import { settingVault, __local__ } from './storageAccess';
import { Interval_OfSyncComponentsWithStorage_InMilliSec } from '../../utils';

describe("UseSettingVault", () => {

    it("should be rendered", () => {
        cleanup();
        render(
            <UseSettingVault>
                <>Test</>
            </UseSettingVault>
            );
        expect(screen.getByText('Test')).toBeTruthy();
        cleanup();
    })

    it("should provide latest setting and the components should be rerendered", async () => {

        cleanup();
        
        const Child:FC = () => {
            console.debug('A Child in UseSettingVault is rendered.')
            const colorTheme = useContext(colorThemeContext);
            return (
            <>
                {colorTheme}
            </>
            );
        }

        render(
            <UseSettingVault>
                <Child />
            </UseSettingVault>
        );

        // setRed (it should be rerendered)
        console.debug('setRed (it should rerender UseSettingVault): ');
        await act(async () => {
            settingVault.setColorTheme('red');
            await new Promise((resolve) => setTimeout(resolve, Interval_OfSyncComponentsWithStorage_InMilliSec*3));
        });
        expect(screen.getByText('red')).toBeTruthy();

        // setBlue (it should be rerendered)
        console.debug('setBlue (it should rerender UseSettingVault): ');
        await act(async () => {
            settingVault.setColorTheme('blue');
            await new Promise((resolve) => setTimeout(resolve, Interval_OfSyncComponentsWithStorage_InMilliSec*3));
        });
        expect(screen.getByText('blue')).toBeTruthy();

        // setAgain (it should not be rerendered)
        console.debug('setAgain (it should rerender UseSettingVault): ');
        await act(async () => {
            settingVault.setColorTheme('blue');
            await new Promise((resolve) => setTimeout(resolve, Interval_OfSyncComponentsWithStorage_InMilliSec*3));
        });

        // made it out of date (it should be rerendered)
        console.debug('made it out of date (it should rerender UseSettingVault): ');
        await act(async () => {
            localStorage.setItem(__local__.Key.timestamp, 'outofdate');
            await new Promise((resolve) => setTimeout(resolve, Interval_OfSyncComponentsWithStorage_InMilliSec*3));
        });

        //just pass the time (it should not be rerendered)
        console.debug('just pass the time (it should not rerender UseSettingVault): ');
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, Interval_OfSyncComponentsWithStorage_InMilliSec*3));
        });

        cleanup();
    })
})