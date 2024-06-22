import { LMS, Interval_OfCatchUpWithLocalStorage_InMilliSec } from '../../utils';

//ローカルストレージのキーを定義。リテラルでもいいが、変更があった場合に一箇所で修正できるように、変数にしている。
const prefix = 'SettingVault/';
const Key = {
  currentLMS: prefix + 'currentLMS',
  usingLMS: prefix + 'usingLMS',
  defaultDurationOfAssignmentInMin: prefix + 'defaultTimeForAssignmentInMin',
  colorTheme: prefix + 'colorTheme',
  timestamp: prefix + 'timestamp',
};

class SettingVault {
  //各値を保持する変数を定義。初期化時点ではfalsyな値を入れておく。
  private currentLMS: LMS = LMS.UNDEFINED;
  private usingLMS: LMS[] = [];
  private defaultDurationOfAssignmentInMin: number = 0;
  private colorTheme: string = '';

  //catchUp時に実行したい処理をハンドラーとして追加するためのメソッドと、そのハンドラーを保持する変数を定義
  private catchUpHandlers: (() => void)[] = [];
  addCatchUpHandler(callback: () => void) {
    this.catchUpHandlers.push(callback);
  }

  fetchWhole() {
    //各値をローカルストレージから読み込んで、文字列からオブジェクトへ変換
    this.fetchColorTheme();
    this.fetchCurrentLMS();
    this.fetchUsingLMS();
    this.fetchDefaultDurationOfAssignmentInMin();
  }
  //他のプロセスによるストレージの変更を検知するために、最終更新日時を保持する変数を定義
  private _updatedAt: string = '';
  updatedAt() {
    return this._updatedAt;
  }
  private isUpToDate: boolean = true;

  constructor() {
    this.fetchWhole();
    let timestampOnStrage = this.storageTimestamp();
    this._updatedAt = timestampOnStrage;

    //初期化が完了次第、定期的にローカルストレージと同期する処理を開始
    let intervalId = setInterval(() => {
      try {
        this.catchUp();
      } catch (e) {
        if (e instanceof TypeError) {
          return;
        } else {
          throw e;
        }
      }
    }, Interval_OfCatchUpWithLocalStorage_InMilliSec);
  }

  private storageTimestamp() {
    return localStorage.getItem(Key.timestamp) || '';
  }
  private checkIfUpToDate() {
    if (this.storageTimestamp() !== this._updatedAt) {
      this.isUpToDate = false;
    }
    return this.isUpToDate;
  }
  private updateTimestamp() {
    //timestampの更新前に、他のプロセスによる更新がないか確認。そうしないと、他のプロセスによる更新を見落としてしまう。
    this.checkIfUpToDate();
    //timestampの更新
    this._updatedAt = String(Date.now());
    localStorage.setItem(Key.timestamp, this._updatedAt);
  }
  private catchUp() {
    this.checkIfUpToDate();
    if (!this.isUpToDate) {
      this.fetchWhole();

      //登録されているハンドラを全て実行
      this.catchUpHandlers.forEach((handler) => handler());

      //クラスのタイムスタンプを更新
      this._updatedAt = this.storageTimestamp();
      this.isUpToDate = true;
    }
  }

  //以下、各値のセッター、ゲッター、フェッチャーを定義
  setColorTheme(theme: string) {
    this.updateTimestamp();
    this.colorTheme = theme;
    localStorage.setItem(Key.colorTheme, theme);
  }
  fetchColorTheme() {
    this.colorTheme = localStorage.getItem(Key.colorTheme) || '';
    return this.colorTheme;
  }
  getColorTheme() {
    //キャッシュの利用
    if (this.colorTheme) {
      return this.colorTheme;
    }
    return this.fetchColorTheme();
  }

  setCurrentLMS(lms: LMS) {
    this.updateTimestamp();
    this.currentLMS = lms;
    localStorage.setItem(Key.currentLMS, lms);
  }
  fetchCurrentLMS() {
    this.currentLMS = (localStorage.getItem(Key.currentLMS) as LMS) || LMS.UNDEFINED;
    return this.currentLMS;
  }
  getCurrentLMS() {
    //キャッシュの利用
    if (this.currentLMS) {
      return this.currentLMS;
    }
    return this.fetchCurrentLMS();
  }

  setUsingLMS(lms: LMS[]) {
    this.updateTimestamp();
    this.usingLMS = lms;
    localStorage.setItem(Key.usingLMS, JSON.stringify(lms));
  }
  fetchUsingLMS() {
    let usingLMS = localStorage.getItem(Key.usingLMS);

    if (usingLMS) {
      this.usingLMS = (JSON.parse(usingLMS) as LMS[]) || [];
    } else {
      this.usingLMS = [];
    }
    return this.usingLMS;
  }
  getUsingLMS() {
    //キャッシュの利用
    if (this.usingLMS) {
      return this.usingLMS;
    }
    return this.fetchUsingLMS();
  }

  setDefaultDurationOfAssignmentInMin(time: number) {
    this.updateTimestamp();
    this.defaultDurationOfAssignmentInMin = time;
    localStorage.setItem(Key.defaultDurationOfAssignmentInMin, String(time));
  }
  fetchDefaultDurationOfAssignmentInMin() {
    this.defaultDurationOfAssignmentInMin = Number(
      localStorage.getItem(Key.defaultDurationOfAssignmentInMin) || 0,
    );
    return this.defaultDurationOfAssignmentInMin;
  }
  getDefaultDurationOfAssignmentInMin() {
    //キャッシュの利用
    if (this.defaultDurationOfAssignmentInMin) {
      return this.defaultDurationOfAssignmentInMin;
    }
    return this.fetchDefaultDurationOfAssignmentInMin();
  }
}

//インスタンスはプロセスを通しで一つだけでいいので、ここで作成してexport.
export const settingVault = new SettingVault();
export const __local__ = { Key: Key, prefix: prefix }; //テスト用
