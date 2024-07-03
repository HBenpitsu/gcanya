[戻る](../README.md)

# ディレクトリ

## app \<temp\>

拡張機能の開発者が実装する機能は全てこの階層にディレクトリを作って実装する。

現在実装済みの機能は以下の通り。
- [vault](./vault/README.md)
- [signal](./signal/README.md)
- [settingVault](./settingVault/README.md)
- [record](./record/README.md)
- [assignmentFetcher](./assignmentFetcher/README.md)

### README.md
このファイル.

### vault

### signal

### settingVault

### record

### assignmentFetcher

# 依存ツリー

インデントが浅いほうが依存先.

- 外部
  - vault
    - signal
    - settingVault
    - record
      - assignmentRecord
  - assignmentFetcher

