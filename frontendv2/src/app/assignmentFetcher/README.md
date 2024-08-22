
[戻る](../README.md)

*未完成

# assignmentFetcher

各LMSから課題をfetchしてくる (APIを用いるかスクレイピングする)
現状で対応しているLMSは以下の通り:

- [TACT](./TACT/README.md)

また，全ての課題情報を保持するAllRecordsVaultに課題を登録する機能を提供する．
（backgroundプロセスが呼び出す．）

複数LMSへの対応は実装できていない為，ほかのLMSに対応する際には`./manageMultipleLMS`, `./updateAllRecordsVault`, `./Data` , `../setting`などを改修する必要があるだろう．

このモジュールはあまりよく設計されていない可能性があるため，検討が必要．

現在外部に露出している関数は唯一`updateAllRecordsVault`のみである．
(backgroundで定期的に呼び出されることを意図している．)
