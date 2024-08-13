
[戻る](../README.md)

# assignmentRecord

課題情報を保持，編集する．
また，アクセスのヘルパを提供する．

`AssignmentRecord`は`Record`を，
`AssignmentRecordVault`は`RecordVault`を合成している．（継承こそしていないが．）

内容の更新に伴ってコンポーネントを再レンダリングしたい場合は`useAssignmentRecords`を用いる．
外部で活用されることが想定されるメソッドとして

- AssignmentRecordVault: 拡張されたレコードの順序集合
  - push: オブジェクトを渡してレコードを追加する．
  - filter: 条件関数を渡してレコードを配列として取得する．
  - all: レコードを配列として全件取得する．
  - sort: 大小関数を渡してレコードを並び替える．
  - drop: 条件関数を渡して真なる要素を削除する．
  - clear: 全件削除する．
- AssignmentRecord
  - unwrap: 配列としてすべての要素を取得する．
  - 各種属性

が挙げられる．
