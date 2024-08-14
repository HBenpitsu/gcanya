[戻る](../README.md)

# endpoints

backendで定義されるendpointをラップする。
定義されているエンドポイントは以下の通り

- "/register": 課題の情報をbackendに送信し、課題をカレンダーに登録する。
- "/getAuthFlowState": OAuthのフローを始める。認証用urlが返却されると共に、cookieに`state`が設定される。
- "/oauth2callback": frontendは直接これを呼ばない。(ここに実装しない。)
- "/getTokens": OAuthのフローを完了し、cookieの`state`を用いて2つのtokenを発行する。`accessToken`と`refreshToken`をCookieに設定して返却する。
- "/refreshTokens": `refreshToken`を用いて`accessToken`を発行し直す。`refreshToken`がcookieに設定されていなければならない。発行されたtokenはcookieに設定される。
- "/revokeTokens": tokenを破棄し、cookieも消去する。

# sessionClient

一連のendpointの呼び出しフローを記述される。

## 課題の登録時

"/register"を呼び出す
-エラーだったら->
"/refreshTokens"を呼び出す
-エラーだったら->
"/getAuthFlowState"を呼び出す。返却されたurlでwindowを開くなどし、ユーザに認証させる。
"/getTokens"をディレイを入れて呼び出す。認証の完了は検知できないので、"/getTokens"でエラーが返却されたらしばらく待って再び試みる。

エラーを解消したら"/register"を呼び出し直す。
