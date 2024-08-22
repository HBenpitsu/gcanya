[戻る](../README.md)

# signalv2

異なるプロセス間の協働をvault (ローカルストレージ) を介して実現する仕組みである．
Signalには以下の4つの状態がある．

- INACTIVE: 一度も，もしくはcancelされてからsignalが送信されていないことを示す
- UNPROCESSED: 最後にsignalが送信されてからhandlerが呼び出されていないことを示す
- PROCESSING: 最後にsignalが送信されてからhandlerが実行されたことを示す．
- PROCESSED: 最後にsignalが送信されてからhandlerの実行が完了したことを示す．

である．送信されたsignalは一定時間経過後に自動的にcancelされる.

具体的なシグナルは，Signalクラスのインスタンスとして定義される．
