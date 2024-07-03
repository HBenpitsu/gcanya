import { vaultCatchUpInterval } from "../../utils";

const storage:Storage = localStorage;

//exportはテスト用
export const timestampSignature= 'vault-set-timestamp';

type VaultKey = string;
type VaultValue = string;

class Vault {
    private storageSignature: string = '';
    private isUpToDate: boolean = true;

    private observedKeys: VaultKey[] = [];
    private observe(key: VaultKey): void {
        if (!this.observedKeys.includes(key)) {this.observedKeys.push(key);}
    }
    private updateListeners: Record<VaultKey,((value:VaultValue) => Promise<void>)[]> = {};
    private defaultValues: Record<VaultKey, VaultValue> = {};
    private cachedValues: Record<VaultKey, VaultValue> = {};

    constructor() {this.catchUp()}

    private updateStorageSignature(): void {
        //シグネチャを上書き前する前に、最新であるか確認する。さもなくばoutOfDateかを判断できない。
        this.checkIfUpToDate();

        //signatureを新しく生成してセット
        this.storageSignature = new Date().toISOString();
        storage.setItem(timestampSignature, this.storageSignature);
    }

    private checkIfUpToDate(): boolean {
        //シグネチャが一致していなければ、最新でないと判断。一致している場合は場合は現在の状態を保留する。
        const real_signature = storage.getItem(timestampSignature);
        if (this.storageSignature !== real_signature) {
            this.isUpToDate = false;
        }
        return this.isUpToDate;
    }

    async catchUp(): Promise<void>{
        // 最新でない場合は、ローカルストレージから値を取得し直す。
        // キャッシュの値が異なったKeyのアップデートリスナーを呼ぶ。また、監視中のキーを初めてキャッシュできた場合もアップデートリスナーを呼ぶ。
        this.checkIfUpToDate();
        if (!this.isUpToDate) {
            let promise_buf = [];
            for (let key of this.observedKeys) {
                let fetchedValue = storage.getItem(key);
                if ( 
                    fetchedValue !== null 
                    && (
                        !(key in this.cachedValues) 
                        || this.cachedValues[key] !== fetchedValue
                    )
                ) {
                    this.cachedValues[key] = fetchedValue!;
                    promise_buf.push(this.callUpdateListeners(key, fetchedValue!));
                }
            }
            // プロセスが持つシグネチャをローカルストレージのものと合わせて、upToDateフラグを立てる。
            this.storageSignature = storage.getItem(timestampSignature) ?? '';
            this.isUpToDate = true;
            await Promise.all(promise_buf);
        }
    }

    get(key: VaultKey): VaultValue {
        // キャッシュされていればそれを返す。されていなければfetchする。
        // キャッシュされていれば既に監視されているし、キャッシュされていなければfetch時に監視されるので、ここでobserveを呼ぶ必要はない。
        if (key in this.cachedValues) {
            return this.cachedValues[key];
        }
        return this.fetch(key);
    }

    fetch(key: VaultKey): VaultValue {
        // キーが監視されていなければ監視する。続けてストレージから値を読み出す。
        // 読みだせなかった（nullだった）場合、デフォルト値が設定されている場合はそれを返す。設定されていない場合はエラーを投げる。
        // 読み出せた場合はキャッシュして返す。
        this.observe(key);

        let value = storage.getItem(key);

        if (value === null && key in this.defaultValues) {return this.defaultValues[key];}
        if (value === null) {throw Error('key: \''+key+'\' not found in the storage.');}

        this.cachedValues[key] = value;
        return this.cachedValues[key];
    }

    async set(key: VaultKey, value: VaultValue): Promise<void> {
        // キーが監視されていなければ監視する。続けてストレージ、キャッシュに値を書き込んで、アップデートリスナーを呼ぶ。
        // ストレージに値を書き込むときシグネチャを更新する。
        this.observe(key);

        this.updateStorageSignature();
        storage.setItem(key, value);

        this.cachedValues[key] = value;
        await this.callUpdateListeners(key, value);
    }

    setDefault(key: VaultKey, value: VaultValue): void {
        // キーを監視してデフォルト値を設定する。
        this.observe(key);

        this.defaultValues[key] = value;
    }

    addUpdateListener(key: VaultKey, listener: (value:VaultValue) => Promise<void>): void {
        // キーを監視してアップデートリスナーを登録する。
        this.observe(key);

        if (!(key in this.updateListeners)) {this.updateListeners[key] = [];}
        this.updateListeners[key].push(listener);
    }

    private async callUpdateListeners(key: VaultKey, value: VaultValue): Promise<void> {
        if (key in this.updateListeners){
            let promise_buf = [];
            for (let listener of this.updateListeners[key]) {
                promise_buf.push(listener(value));
            }
            await Promise.all(promise_buf);
        }

    }

}

// シングルトンで良いだろう
export const vault: Vault = new Vault();

// vault.catchUpを直接呼び出すと、catchUp内でthisがundefinedになるので、クロージャを作る。
setInterval(()=>{vault.catchUp()}, vaultCatchUpInterval)
