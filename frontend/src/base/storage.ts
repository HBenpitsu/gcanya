import { match } from '@twind/core';
import { UserEnvironment } from '../data/userInformation';
import { Browser } from '../data/consts';

export interface Storage {
    save(key: string, value: string): Promise<void>;
    get(key: string): Promise<string>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
}

class ChromeStorage implements Storage{

    save(key: string, value: string) {
        return new Promise<void>((resolve, reject) => {
            chrome.storage.local.set({ [key]: value }, () => {resolve();});
        }); 
    }

    get(key: string) {
        return new Promise<string>((resolve, reject) => {
            chrome.storage.local.get([key], (result) => {resolve(result[key]);});
        });
    }

    remove(key: string) {
        return new Promise<void>((resolve, reject) => {
            chrome.storage.local.remove(key, () => {resolve();});
        });
    }

    clear() {
        return new Promise<void>((resolve, reject) => {
            chrome.storage.local.clear(() => {resolve();});
        });
    }

}


export function get_storage_instance(UserEnvironment:UserEnvironment): Storage{
    switch (UserEnvironment.usingBrowser) {
        case Browser.Chrome:
            return new ChromeStorage();
        default:
            throw new Error('Unsupported browser');
    }
}

// export const storage = new Storage();
