[戻る](../README.md)

# assignmentRegisterer

backendとの協働を司る．

## endpoints

backendが定義するendpointをラップする．データの形式を変更する必要がある場合もここで行う．（パースする）

## autholizer

endpointsと返却されるコードを組み合わせ，認証処理を行う．
listenToSignal関数を実行してsignalを待つ．
