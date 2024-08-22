[戻る](../README.md)

# assignmentRegisterer

## endpoints

backendが定義するendpointをラップする．データの形式を変更する必要がある場合もここで行う．（パースする）

### /register: POST

イベントをGoogleカレンダーに登録する.

class __assignmentRegisterCommand(BaseModel):
    course_name:str
    title_of_assignment:str
    dueDate:datetime
    duration:timedelta
    description:str|None = None

return: {"detail":"success","event_ids":event_ids}

### /getAuthFlowState: GET

認証用URLを取得する．
return: {"auth_url": url, "detail": "success"}

### /oauth2callback: GET

frontend側で明示的に用いることはない．

### /getTokens: GET

Cookieに，GoogleのAccessTokenを載せる
return: {"detail": "success"}

### /refreshTokens: GET

Cookieに，GoogleのAccessToken発行し載せ直す．
return: {"detail": "success"}

### /revokeTokens: GET

CookieのAccessTokenを消去する．
return: {"detail": "success"}

## autholizer

endpointsの組み合わせによって認証処理を完遂する．
backgroundから呼び出されるべきメソッド`authorize`, `putAuthURL`と
foregroundから呼び出されるべきメソッド`getAuthURL`が定義されている．

backgroundとforegroundはsignalを通じて協働する．

`authorize`は`OAuthSig`のhandlerである．また，`showAuthURLSig`を発信し，foregroundでbackgroundで取得したURLを表示するよう要請する．
`putAuthURL`,`getAuthURL`はプロセスをまたいで値 ( backgroundが取得したURL ) をやり取りするために定義される．

`OAuthSig`の送信をここでwrapするべきかもしれない．しかし，単に`OAuthSig.send()`程度の記述であるから，どうするべきかつかみあぐねる．

## register

endpointsの組み合わせによって課題のカレンダーへの登録を完遂する．
backgroundから呼び出されるべきメソッド`register`と
foregroundから呼び出されるべきメソッド`registerOneRecord`, `registerAllPendingAssignments`が定義されている．

`register`は`registerSig`のhandler.

registerOneRecord, registerAllPendingAssignmentsについて説明するために，課題の登録のためにregistererationQueue (登録キュー) を利用することに触れておく．
registererationQueueはAssignmentRecordVaultのインスタンスであり，登録待ちのAssignmentRecordを保持する．
registerOneRecordは渡された一つのレコードを登録キューに追加して，**registerSigを送信する．**
同様にregisterAllPendingAssignmentsは未登録のすべてのレコードを登録キューに追加して，**registerSigを送信する．**
