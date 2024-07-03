import { cleanup, render, screen, act } from '@testing-library/react';
import React, { useContext,FC } from 'react';
import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { vaultCatchUpInterval } from '../../utils';
import { useOAuthSignal } from './useSignal';
import { signalSender,Signal, signalReceiver,SignalState } from './signal';
import { vault } from '../vault';

describe('useSetting functions ', () => {
    it('should be defined', () => {
        expect(useOAuthSignal).toBeDefined();
    })

    it ('should be able to be used in components', async () => {
        
        // signalReceiver.setSignalHandler(Signal.OAuth, async () => {
        //     await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*3));
        //     console.log("handling", new Date());
        // });
        // signalSender.addSignalStateListener(Signal.OAuth, (state) => {console.log("stateUpdated",state, new Date())});
        
        // const Child = () => {
        //     const [signalState, sendSignal] = useOAuthSignal();
        //     return <>{signalState}</>
        // }
        // render(<Child />);
        // screen.getByText(SignalState.INNACTIVE);

        // act(() => {signalSender.send(Signal.OAuth);})
        // screen.debug();
        // await act(async () => {new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval * 2))});
        // console.log(vault.get(Signal.OAuth));
        // screen.debug();
        // await act(async () => {new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval * 2))});
        // console.log(vault.get(Signal.OAuth));
        // screen.debug();

        signalReceiver.setSignalHandler(Signal.OAuth, async () => {
            await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*3));
            console.log("handling", new Date());
        });
        signalSender.addSignalStateListener(Signal.OAuth, (state) => {console.log("stateUpdated",state, new Date())});
        
        signalSender.send(Signal.OAuth);
        
        await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval * 2));
        console.log(vault.get(Signal.OAuth));
        await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval * 2));
        console.log(vault.get(Signal.OAuth));
    })
})