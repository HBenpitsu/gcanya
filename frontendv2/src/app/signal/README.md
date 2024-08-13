
# signal

基本的にbackgroundへの処理の委譲を実現する手段として用いる。
signalの送信は`send_signal`メソッド、
signalの受信はcallback関数を取る`listen_to_signals`か、特定のSignalを受け取るまで待機する`wait_for_signal`で行う。
`listen_to_signals`は実行時点でsignalが`UNPROCESSED`でない場合 (`PROCESSING`,`PROCESSED`の場合) 単にcallback関数は呼び出されないので、定期的に実行する必要がある。

また使用上taskを積み上げるqueueのような使い方はできない。すなわち、`PROCESSING`状態で送信されたSignalは無視される。queueが必要な場合は別に実装すること。
