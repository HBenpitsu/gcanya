[戻る](../README.md)

# assignmentRegisterer

backendとの協働を司る．

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

endpointsと返却されるコードを組み合わせ，認証処理を行う．
listenToSignal関数を実行してsignalを待つ．
