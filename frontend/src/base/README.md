[戻る](../README.md)

# remote

外部との通信をラップする。
本アプリは
- backendサーバ
- lmsのAPI
と通信する。
[詳細](./remote/README.md)

# storage

永続化の基本的な機能をラップする。

# signal

storageを使用して実装している。
基本的にbackgroundへの処理の委譲を実現する手段として用いる。
signalの送信は
