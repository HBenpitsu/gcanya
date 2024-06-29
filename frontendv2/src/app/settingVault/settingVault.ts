import { UsingLMS, UITheme, Keys } from './settings';
import { vault } from '../vault';
import { Temporal } from 'temporal-polyfill';

class SettingVault {
    constructor() {
        vault.setDefault(Keys.usingLMSList, '[]'); 
        vault.addUpdateListener(Keys.usingLMSList, this.listenToUsingLMSListUpdate);
        vault.setDefault(Keys.UITheme, UITheme.light);
        vault.addUpdateListener(Keys.UITheme, this.listenToUIThemeUpdate);
        vault.setDefault(Keys.defaultAssignmentDuration, '30');
        vault.addUpdateListener(Keys.defaultAssignmentDuration, this.listenToDefaultAssignmentDurationUpdate);
    }


    private _usingLMSList: UsingLMS[] = [];
    get usingLMSList(): UsingLMS[] {
        return this._usingLMSList;
    }
    addLMS(lms:UsingLMS){
        this._usingLMSList.push(lms); 
        vault.set(Keys.usingLMSList, JSON.stringify(this._usingLMSList));
        // vaultがlistenToUsingLMSListUpdateを呼び出すので、updateListenerは呼び出さない。
    }
    removeLMS(lms:UsingLMS){
        this._usingLMSList = this._usingLMSList.filter(l => l !== lms);
        vault.set(Keys.usingLMSList, JSON.stringify(this._usingLMSList));
        // vaultがlistenToUsingLMSListUpdateを呼び出すので、updateListenerは呼び出さない。
    }

    private usingLMSListUpdateListeners: ((val: UsingLMS[]) => Promise<void>)[] = [];
    async listenToUsingLMSListUpdate(val: string){
        //自分自身の変更もstringifyされた後にparseされて再代入されるというオーバーヘッドはあるが、流れをシンプルにするために目を瞑る。
        this._usingLMSList = JSON.parse(val) as UsingLMS[];
        for(const listener of this.usingLMSListUpdateListeners){listener(this._usingLMSList);}
    }
    addUsingLMSListUpdateListener(listener: (val: UsingLMS[]) => Promise<void>){
        this.usingLMSListUpdateListeners.push(listener);
    }



    private _uiTheme: UITheme = UITheme.light;
    get uiTheme(): UITheme {
        return this._uiTheme;
    }
    set uiTheme(theme: UITheme){
        vault.set(Keys.UITheme, theme as string);
    }

    private uiThemeUpdateListeners: ((val: UITheme) => Promise<void>)[] = [];
    async listenToUIThemeUpdate(val: string){
        this._uiTheme = val as UITheme;
        for(const listener of this.uiThemeUpdateListeners){listener(this._uiTheme);}
    }
    addUIThemeUpdateListener(listener: (val: UITheme) => Promise<void>){
        this.uiThemeUpdateListeners.push(listener);
    }



    private _defaultAssignmentDuration: Temporal.Duration = Temporal.Duration.from({minutes: 30});
    get defaultAssignmentDuration(): Temporal.Duration {
        return this._defaultAssignmentDuration;
    }
    set defaultAssignmentDuration(duration: Temporal.Duration){
        vault.set(Keys.defaultAssignmentDuration, duration.toString());
    }

    private defaultAssignmentDurationUpdateListeners: ((val: Temporal.Duration) => Promise<void>)[] = [];
    async listenToDefaultAssignmentDurationUpdate(val: string){
        this._defaultAssignmentDuration = Temporal.Duration.from(val);
        for(const listener of this.defaultAssignmentDurationUpdateListeners){listener(this._defaultAssignmentDuration);}
    }
    addDefaultAssignmentDurationUpdateListener(listener: (val: Temporal.Duration) => Promise<void>){
        this.defaultAssignmentDurationUpdateListeners.push(listener);
    }
}

// シングルトン
export const settingVault = new SettingVault();