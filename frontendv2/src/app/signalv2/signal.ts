import { vault } from '../vault';
import { sleep,allowBlocking } from '../../utils';

export enum SignalState {
    INNACTIVE = 'INNACTIVE',
    UNPROCESSED = 'UNPROCESSED',
    PROCESSING = 'PROCESSING',
    PROCESSED = 'PROCESSED',
}

export class Signal {
    signalName: string;
    state: SignalState = SignalState.INNACTIVE;
    handler: (()=>Promise<void>)|null = null;
    onINNACTIVE: (()=>Promise<void>)[] = [];
    onUNPROCESSED: (()=>Promise<void>)[] = [];
    onPROCESSING: (()=>Promise<void>)[] = [];
    onPROCESSED: (()=>Promise<void>)[] = [];
    onStateChanged: ((state: SignalState)=>Promise<void>)[] = [];
    timeout_ms: number;
    timeoutId: NodeJS.Timeout|null;

    constructor(signalName: string, timeout_ms: number = 1000) {
        this.signalName = "signal/"+signalName+"/state";
        vault.setDefault(this.signalName, SignalState.INNACTIVE);
        vault.addUpdateListener(this.signalName, async (value) => {
            await this.onVaultUpdate(value as SignalState);
        });
        this.timeout_ms = timeout_ms;
        this.timeoutId = null;
    }

    send() {
        if (this,this.timeoutId !== null) { clearTimeout(this.timeoutId); }
        this.state = SignalState.UNPROCESSED;
        vault.set(this.signalName, SignalState.UNPROCESSED);
        this.timeoutId = setTimeout(() => { this.cancel();}, this.timeout_ms);
    }

    cancel() {
        if (this,this.timeoutId !== null) { clearTimeout(this.timeoutId); }
        this.state = SignalState.INNACTIVE;
        vault.set(this.signalName, SignalState.INNACTIVE);
    }

    async wait(interval_ms: number = 10) {
        while (this.state !== SignalState.PROCESSED) {
            await sleep(interval_ms);
        }
    }

    observe() {
        return this.state;
    }

    setSignalHandler(callback: ()=>Promise<void>) {
        if (this.handler !== null) {
            throw new Error('signal ' + this.signalName + ' handler was set multiple times.');
        }
        this.handler = callback;
    }

    private async handleSignal() {
        if (this.handler === null ) {return;}

        if (this.state !== SignalState.UNPROCESSED) {return;}
        this.state = SignalState.PROCESSING;
        await vault.set(this.signalName, SignalState.PROCESSING);
        await allowBlocking();
        
        if (this.state !== SignalState.PROCESSING) {return;}
        await this.handler();
        
        if (this.state !== SignalState.PROCESSING) {return;}
        if (this,this.timeoutId !== null) { clearTimeout(this.timeoutId); }
        this.state = SignalState.PROCESSED;
        await vault.set(this.signalName, SignalState.PROCESSED);
    }

    addSignalChangedListener(callback: (state: SignalState) => Promise<void>) {
        this.onStateChanged.push(callback);
    }

    addINNACTIVEListener(callback: () => Promise<void>) {
        this.onINNACTIVE.push(callback);
    }

    addUNPROCESSEDListener(callback: () => Promise<void>) {
        this.onUNPROCESSED.push(callback);
    }

    addPROCESSINGListener(callback: () => Promise<void>) {
        this.onPROCESSING.push(callback);
    }

    addPROCESSEDListener(callback: () => Promise<void>) {
        this.onPROCESSED.push(callback);
    }

    private async onVaultUpdate(state: SignalState) {
        this.state = state;

        let listenerPromiseBuffer = [];
 
        for (let callback of this.onStateChanged) {
            listenerPromiseBuffer.push(callback(this.state));
        }

        listenerPromiseBuffer.push(this.handleSignal());

        switch (this.state) {
            case SignalState.INNACTIVE:
                for (let callback of this.onINNACTIVE) {
                    listenerPromiseBuffer.push(callback());
                }
                break;
            case SignalState.UNPROCESSED:
                for (let callback of this.onUNPROCESSED) {
                    listenerPromiseBuffer.push(callback());
                }
                break;
            case SignalState.PROCESSING:
                for (let callback of this.onPROCESSING) {
                    listenerPromiseBuffer.push(callback());
                }
                break;
            case SignalState.PROCESSED:
                for (let callback of this.onPROCESSED) {
                    listenerPromiseBuffer.push(callback());
                }
                break;
        }

        await Promise.all(listenerPromiseBuffer);
    }
}
