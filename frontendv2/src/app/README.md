[戻る](../README.md)

# ディレクトリ

## app \<temp\>

拡張機能の開発者が実装する機能は全てこの階層にディレクトリを作って実装する。

現在実装済みの機能は以下の通り。

- [vault](./vault/README.md)
- [signal](./signal/README.md)
- [settingVault](./settingVault/README.md)
- [record](./record/README.md)
- [assignmentFetcher](./assignmentFetcher/README.md)

### README.md

このファイル.

### vault

localStorageをラップして、

- 複数のプロセスの協働
- 変更の監視
  - ハンドラの設定

を行えるようにする。

### signal

基本的にbackgroundへの処理の委譲を実現する手段として用いる。
signalの送信は`send_signal`メソッド、
signalの受信はcallback関数を取る`listen_to_signals`か、特定のSignalを受け取るまで待機する`wait_for_signal`で行う。
`listen_to_signals`は実行時点でsignalが`UNPROCESSED`でない場合 (`PROCESSING`,`PROCESSED`の場合) 単にcallback関数は呼び出されないので、定期的に実行する必要がある。

また使用上taskを積み上げるqueueのような使い方はできない。すなわち、`PROCESSING`状態で送信されたSignalは無視される。queueが必要な場合は別に実装すること。

### setting

- ユーザー設定の定義
- vaultへの保存
- vaultから読み出した値のパース

### record

- 課題情報の保存

### assignmentFetcher

# 依存ツリー

インデントが浅いほうが依存先.

- 外部
  - vault
    - signal
    - settingVault
    - record
      - assignmentRecord
  - assignmentFetcher
