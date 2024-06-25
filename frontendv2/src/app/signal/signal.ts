import { Interval_ForTransciever_ToCheckSignal_InMilliSec } from '../../utils';

const signalPrefix = 'signal/';

export enum Signal{
    AUTHENTICATION='authentication',
    REGISTRATION='registration',
}

export enum SignalState{
    UNPROCESSED='unprocessed',
    PROCESSING='processing',
    PROCESSED='processed' //default
}

const storage:Storage = localStorage;

class SignalTransceiver {

    /* signalを送る。実際に設定したsignalの種類を返す。 */
    send_signal(signal:Signal){
        if (storage.getItem(signalPrefix+signal) ==SignalState.PROCESSING) {
            return SignalState.PROCESSING;
        }
        storage.setItem(signalPrefix+signal, SignalState.UNPROCESSED);
        return SignalState.UNPROCESSED;
    }

    /* 停止用関数を返す。callbackはstateがUNPROCESSEDになると呼び出され、callbackの処理が完了するとstateはprocessedになる。 */
    set_signal_handler(signal:Signal, callback:()=>Promise<void>){
        const intervalId = setInterval(async ()=>{
            if (storage.getItem(signalPrefix+signal) == SignalState.UNPROCESSED) {
                storage.setItem(signalPrefix+signal, SignalState.PROCESSING);
                await callback();
                storage.setItem(signalPrefix+signal, SignalState.PROCESSED);
            }
        },Interval_ForTransciever_ToCheckSignal_InMilliSec)
        return ()=>clearInterval(intervalId);
    }

    /* 停止用関数を返す。handlerと違い、signalStateを変更しない。*/
    set_signal_interceptor(signal:Signal, callback:(ss:SignalState)=>Promise<void>){
        const intervalId = setInterval(async ()=>{
            const signalState = storage.getItem(signalPrefix+signal);
            if (signalState == SignalState.UNPROCESSED) {
                await callback(signalState);
            }
        },Interval_ForTransciever_ToCheckSignal_InMilliSec)
        return ()=>clearInterval(intervalId);
    }

    check_signal(signal:Signal){
        return storage.getItem(signalPrefix+signal);
    }
}


export const signalTransceiver = new SignalTransceiver();