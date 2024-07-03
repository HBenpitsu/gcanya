import { vault } from '../vault';

export enum SignalState{
    INNACTIVE = 'INNACTIVE',
    UNPROCESSED = 'UNPROCESSED',
    PROCESSING = 'PROCESSING',
    PROCESSED = 'PROCESSED',
}

export enum Signal{
    OAuth = 'signal/OAuth',
}

class SignalReceiver{
    private handledSignals: Signal[] = [];
    setSignalHandler(signal: Signal, callback: () => Promise<void>){
        if (this.handledSignals.includes(signal)){throw new Error('signal '+signal+' handler was added multiple times.');}
        vault.addUpdateListener(signal, async (state) => {
            if (state === SignalState.UNPROCESSED){ // UNPROCESSED以外の状態への変化を感知すると無限ループになってしまう
                vault.set(signal, SignalState.PROCESSING);
                await callback();
                vault.set(signal, SignalState.PROCESSED);
            }
        });
        this.handledSignals.push(signal);
    }
}

// シングルトン
export const signalReceiver = new SignalReceiver();

class SignalSender{
    constructor(){
        vault.setDefault(Signal.OAuth, SignalState.INNACTIVE);
    }
    send(signal: Signal){
        if (
            vault.get(signal) === SignalState.PROCESSING 
            || vault.get(signal) === SignalState.UNPROCESSED
        ){return;}
        vault.set(signal, SignalState.UNPROCESSED);
    }
    addSignalStateListener(signal: Signal, callback: (state: SignalState) => void){
        vault.addUpdateListener(signal, async (state) => {
            callback(state as SignalState);
        });
    }
}

// シングルトン
export const signalSender = new SignalSender();