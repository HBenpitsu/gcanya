import { vault } from '../vault';
import { allowBlocking, sleep } from '../../utils';

export enum SignalState{
    INNACTIVE = 'INNACTIVE',
    UNPROCESSED = 'UNPROCESSED',
    PROCESSING = 'PROCESSING',
    PROCESSED = 'PROCESSED',
}

export enum Signal{
    showAuthURL = 'signal/showAuthURL',
    OAuth = 'signal/OAuth',
    Register = 'signal/Register',
}

class Handler{
    private handledSignals: Signal[] = [];
    private processing: boolean = false;
    setSignalHandler(signal: Signal, callback: () => Promise<void>){
        if (this.handledSignals.includes(signal)){throw new Error('signal '+signal+' handler was added multiple times.');}
        vault.addUpdateListener(signal, async (state) => {
            if (!this.processing && state === SignalState.UNPROCESSED){
                this.processing = true;
                await allowBlocking(); 
                await vault.set(signal, SignalState.PROCESSING);
                await callback();
                await vault.set(signal, SignalState.PROCESSED);
                this.processing = false;
            }
        });
        this.handledSignals.push(signal);
    }
}

// シングルトン
export const signalHandler = new Handler();

class Terminal{
    constructor(){
        vault.setDefault(Signal.showAuthURL, SignalState.INNACTIVE);
        vault.setDefault(Signal.OAuth, SignalState.INNACTIVE);
        vault.setDefault(Signal.Register, SignalState.INNACTIVE);
    }
    async send(signal: Signal){
        if (
            vault.get(signal) === SignalState.PROCESSING 
            || vault.get(signal) === SignalState.UNPROCESSED
        ){return;}
        await vault.set(signal, SignalState.UNPROCESSED);
    }
    addSignalStateUpdateListener(signal: Signal, callback: (state: SignalState) => Promise<void>){
        vault.addUpdateListener(signal, async (state) => {
            await callback(state as SignalState);
        });
    }
    observe(signal: Signal){
        return vault.get(signal) as SignalState;
    }
    cancel(signal: Signal){
        vault.set(signal, SignalState.INNACTIVE);
    }
    async wait(signal: Signal, interval_ms: number=10){
        while (vault.get(signal) !== SignalState.PROCESSED){
            await sleep(interval_ms);
        }
    }
}

// シングルトン
export const signalTerminal = new Terminal();