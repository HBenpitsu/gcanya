[戻る](../README.md)

# data
複数の機能、機能類型をまたいで利用される型(DataTransferObject)と定数を定義する。
なお、ここに定義される型は極力シンプルであるべき。

## assignments
特定のLMSに依存せず、保持されるべき情報を規定する。

### Assignment
LSMから取得した情報

### AssignmentRecord
Assignmentに所要時間、登録済みか否かなど、拡張機能側で情報を付加したれコード。ストレージへの保存やストレージからの読み出しはこの型に依る。

### AssignmentRegisterCommand
backend側に送信する情報を規定した型.
`backend`の`AssignmentRegister/InterpackageObjects/.../Assignment`型と一致する
durationは秒数で渡すので注意.