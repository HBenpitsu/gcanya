import { cleanup, render, screen, act } from '@testing-library/react';
import React, { useContext,FC } from 'react';
import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { sleep } from '../../utils';
import { useOAuthSignal } from './useSignal';
import { signalSender,Signal, signalReceiver,SignalState } from './signal';
import { vaultCatchUpInterval } from '../vault/vault';

describe('useSetting functions ', () => {
    it('should be defined', () => {
        expect(useOAuthSignal).toBeDefined();
    })

    it ('should be able to be used in components', async () => {
        
        signalReceiver.setSignalHandler(Signal.OAuth, async () => {
            await sleep(vaultCatchUpInterval*3);
        });
        
        const Child = () => {
            const [signalState, sendSignal] = useOAuthSignal();
            return <>{signalState}</>
        }
        render(<Child />);
        screen.getByText(SignalState.INNACTIVE);

        await act(async () => {signalSender.send(Signal.OAuth);})

        await act(async () => {await sleep(vaultCatchUpInterval * 2)});
        screen.getByText(SignalState.PROCESSING);

        await act(async () => {await sleep(vaultCatchUpInterval * 2)});
        screen.getByText(SignalState.PROCESSED);
    })
})