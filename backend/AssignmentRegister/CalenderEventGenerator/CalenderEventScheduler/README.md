[戻る](../README.md)

# CalenderEventScheduler

課題を登録する時間区間の算出を`bitmap.py`に定義されている`FreeBusyBitMap`を利用しながら行う。

`FreeBusyBitMap`から取得できるひとまとまりの空き時間区間をchunkあるいはfree_chunkとする。
また、空き時間か否かを判定する基準とそれに従ってchunkを生成する関数をspecあるいはchunk_specとする。
`Scheduler`がスケジューリングの際に考慮する時間区間をscopeという。
ただし内部的にscope自体が用いられることはなく、scopeの終わりのほうが切り取られた`margined_scope`が用いられている

Schedulerは多くのデフォルト値(`config.py`内に定められた定数)を取るが、これは現段階ではフロント側（ユーザー）から指定することができない。これは要改善事項だろう。

## bitmap - FreeBusyBitMap

空き時間取得のためのツール。bitmapがエンコードする時間区間全体:scopeと、一つのbitがエンコードする区間の長さ:intervalを取って初期化する。
（sdopeがintervalで割り切れる必要はないが、割り切れない場合最後のbitがエンコードする区間の長さが他より小さくなる。）
コード内では一つのbitがエンコードする区間をcell, 連続したcellがいくつか結合したものをchunkと呼んでいる。
Free: 予定のないcellは0,
Busy: 予定のあるcellは1としてエンコードされ、
bit演算などを用いて多少効率的な空き時間の算出を可能にする。

クラス下部に定義された演算子オーバーロードは殆どがビット演算子のラッパーである。（ただし返り値はFreeBusyBitMapになっている。）

## bitmapFactory

上記にて導入されたFreeBusyBitMapを生成するための関数群である。

### avoid_task_overlapping

GoogleCalenderAPIClientを利用してscope内に存在するイベントをすべて取得。
イベントの存在するcellをすべてbusyとしてマークしたbitmapを返す。

### make_margin

何らかのcellがbusyマークされたbitmapをとり、busyマークを指定された時間分前後に塗り拡げる。
これによって、何らかのタスクが存在した場合その直前直後を避けることができる。

### avoid_sleeping_time

渡されたSleepScheduleに従って、睡眠中をbusyとしてマークしたbitmapを返す。

# 例外

bitmapFacotry/avoid_task_overlappingが
GoogleCalenderAPIWrapperに依存しているのでこの例外が送出される可能性がある。
`raise ValueError`が記述されているが、アサーションである。