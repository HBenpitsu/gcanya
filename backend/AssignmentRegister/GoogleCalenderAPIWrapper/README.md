[戻る](../README.md)

# GoogleCalenderAPIWrapper

[リファレンス](https://developers.google.com/calendar/api/v3/reference?hl=ja)

リファレンスに従ってGoogleAPIリクエストを送るとともに、レスポンスとして帰ってきたdictオブジェクトを`AssignmentEntryHandler/InterpackageObjects`に定義された型のうち、適切なものに詰め替える。
非同期処理への対応のために、Googleから提供されているパッケージは用いず、aiohttpを用いて直接APIのエンドポイントを叩いている。

## GoogleCalendarColorData

未使用ファイル。将来的にフロントエンドから挿入するイベントの色などを指定できるようにするときに必要になるだろう。

# 例外

exceptionに定義された例外が送出される可能性があるが、必要であればHTTPExceptionsを送出するのでBackendの上流はこれをハンドリングする必要はない。

## TooManyEvents

この例外に関しては`GoogleCalenderAPIClient`がGoogleCalenderAPIが送ってくる`NextPageToken`に対応していないことに依る。
これに関しては修正の必要があればすぐに修正できるだろう。`_get_raw_events`をNextPageTokenに対応させ、`get_events`もそれに合わせて修正する。
`get_events`はもともとAsyncGeneratorなので、結果の出力形式は変わらない。
