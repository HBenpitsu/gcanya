
[戻る](../README.md)

# assignmentRecord

課題情報の保持，読み出し，編集を担う．

各メソッドの概略は以下のとおり:

- AssignmentRecordVault: 拡張されたレコードの順序集合
  - push: オブジェクトを渡してレコードを追加する．
  - filter: 条件関数を渡してレコードを配列として取得する．
  - all: レコードを配列として全件取得する．
  - sort: 大小関数を渡してレコードを並び替える．
  - drop: 条件関数を渡して真なる要素を削除する．
  - clear: 全件削除する．
- AssignmentRecord
  - unwrap: 配列としてすべての要素を取得する．
  - 各属性のsetter, getter
    - id: 課題及びレコードのid
    - title: 課題の名称
    - description: 課題の説明
    - dueDate: 課題の締め切り (ZonedDateTime)
    - course_name: 課題を出した授業の名称
    - course_id: 課題を出した授業のid
    - duration: 課題の所要時間 (予測/実測)
    - status: 以下の内何れか
      - 未着手:   Pending
      - 登録済み: Registered
      - 完了:     Completed
