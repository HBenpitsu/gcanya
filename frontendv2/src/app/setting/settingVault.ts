import { LMS, UITheme, Keys } from './settings';
import { vault } from '../vault';
import { Temporal } from 'temporal-polyfill';

class SettingVault {

    constructor() {
        vault.setDefault(Keys.LMSList, '[]'); 
        vault.addUpdateListener(Keys.LMSList, async (val)=>{this.listenToLMSListUpdate(val)}); //クロージャにしないとthisがundefinedになる。
        vault.setDefault(Keys.UITheme, UITheme.light as string);
        vault.addUpdateListener(Keys.UITheme, async (val)=>{this.listenToUIThemeUpdate(val)});
        vault.setDefault(Keys.defaultAssignmentDuration, String(Temporal.Duration.from({minutes: 30})));
        vault.addUpdateListener(Keys.defaultAssignmentDuration, async (val)=>{this.listenToDefaultAssignmentDurationUpdate(val)});
    }
    
    private _LMSList: LMS[] = [];
    get LMSList(): LMS[] {
        return this._LMSList;
    }
    addLMS(lms:LMS){
        if (this._LMSList.includes(lms)){return;}// 重複を許さない
        this._LMSList.push(lms); 
        vault.set(Keys.LMSList, JSON.stringify(this._LMSList));
        // vaultがlistenToLMSListUpdateを呼び出すので、updateListenerは呼び出さない。
    }
    removeLMS(lms:LMS){
        if (!this._LMSList.includes(lms)){return;}// もともとない場合は何もしない
        this._LMSList = this._LMSList.filter(l => l !== lms);
        vault.set(Keys.LMSList, JSON.stringify(this._LMSList));
        // vaultがlistenToLMSListUpdateを呼び出すので、updateListenerは呼び出さない。
    }

    private LMSListUpdateListeners: ((val: LMS[]) => Promise<void>)[] = [];
    async listenToLMSListUpdate(val: string){
        //自分自身の変更もstringifyされた後にparseされて再代入されるというオーバーヘッドはあるが、流れをシンプルにするために目を瞑る。
        //ここでエラーを吐かれると何故かaddLMSを呼んだ時点で無限ループに陥って処理が進まなくなってしまう。プロミス関連のリトライのせいかも知れないが、具体的な原因は不明。
        this._LMSList = JSON.parse(val) as LMS[];
        for(const listener of this.LMSListUpdateListeners){listener(this._LMSList);}
    }
    addLMSListUpdateListener(listener: (val: LMS[]) => Promise<void>){
        this.LMSListUpdateListeners.push(listener);
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