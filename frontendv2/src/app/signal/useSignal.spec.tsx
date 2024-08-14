import { render, screen, act } from '@testing-library/react';
import { describe,it,expect } from '@jest/globals'
import { sleep } from '../../utils';
import { useOAuthSignal } from './useSignal';
import { signalTerminal,Signal, signalHandler,SignalState } from './signal';
import { vaultCatchUpInterval } from '../vault/vault';

describe('useSetting functions ', () => {
    it('should be defined', () => {
        expect(useOAuthSignal).toBeDefined();
    })

    it ('should be able to be used in components', async () => {
        
        signalHandler.setSignalHandler(Signal.AuthURLShown, async () => {
            await sleep(vaultCatchUpInterval*3);
        });
        
        const Child = () => {
            const [signalState, sendSignal] = useOAuthSignal();
            return <>{signalState}</>
        }
        render(<Child />);
        screen.getByText(SignalState.INNACTIVE);

        await act(async () => {signalTerminal.send(Signal.AuthURLShown);})

        await act(async () => {await sleep(vaultCatchUpInterval * 2)});
        screen.getByText(SignalState.PROCESSING);

        await act(async () => {await sleep(vaultCatchUpInterval * 2)});
        screen.getByText(SignalState.PROCESSED);
    })
})