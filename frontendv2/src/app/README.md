[戻る](../README.md)

# app \<temp\>

拡張機能の開発者が実装する機能は全てこの階層にディレクトリを作って実装する。

現在実装済みの機能は以下の通り。

- [assignmentFetcher](./assignmentFetcher/README.md)
- [assignmentRecord](./assignmentRecord/README.md)
- [backendWrapper](./backendWrapper/README.md)
- [flag](./flag/README.md)
- [record](./record/README.md)
- [setting](./setting/README.md)
- [signalv2](./signalv2/README.md)
- [vault](./vault/README.md)

# 依存ツリー

- assignmentFetcher
  - assignmentRecord
    - record
      - vault
- assignmentRecord
  - record
    - vault
- backendWrapper
  - vault
  - signalv2
    - vault
  - flag
    - vault
  - backend
- flag
  - vault
- record
  - vault
- setting
  - vault
- signalv2
  - vault
- vault

# 概要

抽象度が高いモジュール:

- assignmentFetcher
  - LMSから課題を取得する
- assignmentRecord
  - 課題情報を保持，管理する．
- backendWrapper
  - backendに問い合わせてgoogleカレンダーに課題を登録する
- setting
  - 設定を保持，管理する．

- flag
  - 真偽値を異なるプロセスの間で取り扱う．
- record
  - データベース的な機能を提供する．
- signalv2
  - 異なるプロセス間の協働を行うための機能を提供する．

- vault
  - 異なるプロセス間で同一のストレージを操作，監視するための機能を供する．
