import { Storage } from './storage';

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

    constructor(storage:Storage) {
        this.storage = storage;
    }

    async send_signal(signal:Signal) {
        if (await this.storage.get(`signal_${signal}`)==SignalState.PROCESSING) {
            return;
        }
        await this.storage.save(`signal_${signal}`, SignalState.UNPROCESSED);
    }

    async listen_to_signals(callback:(signal:Signal)=>void) {
        let signals = Object.values(Signal);
        for (let signal of signals) {
            if (await this.storage.get(`signal_${signal}`)==SignalState.UNPROCESSED) {
                await this.storage.save(`signal_${signal}`, SignalState.PROCESSING);
                callback(signal);
                await this.storage.save(`signal_${signal}`, SignalState.PROCESSED);
            }
        }
    }
}