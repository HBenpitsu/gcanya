const prefix = 'signal/';

export enum Signal{
    AUTHENTICATION='authentication',
    REGISTRATION='registration',
}

enum SignalState{
    UNPROCESSED='unprocessed',
    PROCESSING='processing',
    PROCESSED='processed'
}

class SignalTransceiver {

    storage:Storage;

    constructor() {
        this.storage = localStorage
    }

    async send_signal(signal:Signal){
        if (await this.storage.getItem(prefix+signal) ==SignalState.PROCESSING) {
            return SignalState.PROCESSING;
        }
        await this.storage.setItem(prefix+signal, SignalState.UNPROCESSED);
        return SignalState.UNPROCESSED;
    }

    async listen_to_signals(callback:(signal:Signal)=>void) {
        let signals = Object.values(Signal);
        for (let signal of signals) {
            if (await this.storage.getItem(prefix+signal)==SignalState.UNPROCESSED) {
                await this.storage.setItem(prefix+signal, SignalState.PROCESSING);
                callback(signal);
                await this.storage.setItem(prefix+signal, SignalState.PROCESSED);
            }
        }
    }

    async wait_for_signal(signal:Signal,interval_ms:number = 1000) {
        while (await this.storage.get(prefix+signal)!=SignalState.UNPROCESSED) {
            await new Promise(resolve => setTimeout(resolve, interval_ms));
        }
    }
}