[戻る](../README.md)

# 機能
ユーザーの設定を保持する。
現状保存されている設定は

- colorTheme // 文字列リテラルを扱うため改修必至
- currentLMS // 不要論
- usingLMS
- defaultDurationOfAssigmentInMin

# 使い方
ストレージの各属性はプライベートで、getter,setterを用いてアクセスする。
例えば、

```ts
import {settingVault} from '..<path>..settingVault';
import {LMS} from '..<path>..utils';

console.log(settingVault.getUsingLMS());
settingVault.setUsingLMS([LMS.NuTACT]);
```

のように使用する。

setXXXは値の設定、getXXXはキャッシュを利用した値の取得、fetchXXXは毎回ローカルストレージにアクセスして値を取得する。

catchUpメソッドは他のプロセスによってストレージが書き換えられたかを判定し、書き換えられていた場合全ての値をfetchし直し、
渡されたコールバック関数を実行する。

storageForComponentは設定の値をUI内で使えるようにContextを子に提供する、
`UseSettingVault`コンポーネントを定義している。`UseSettingVault`の子は
`useContext(usingLMSContext)`などとしてSettingVaultの値を取得できる。
この方法でアクセスすると、settingVaultに変化があったとき再レンダリングできる。

# 実装
ストレージはlocalStorageを用いる。

# 注意
一応複数のプロセスで提携が取れるようにはなっているが、常に互いを上書きし合う状況には対応できない。特にcatchUpのコールバック関数内で値を設定したり、catchUpをトリガーとして値を設定したりすると無限ループに陥る可能性もあるので避けること。

# テストの読み方
