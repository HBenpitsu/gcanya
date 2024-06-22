[戻る](../README.md)

# 注意
popupプロセスは、popupが非表示になったと同時に中止される（破棄される）ので、popupプロセスで時間のかかる処理を行ってはならない。
必ずbackgroundに移譲せよ。

# ディレクトリ

## popup \<temp\>

### Popup.tsx \<temp\>
View(UI)を定義する。アプリケーションロジックとのやり取りはPopupModel (ViewModel) を介して行う。

### PopupModel.ts
ViewModel - Viewに必要な全ての情報、値を取得して統合的に扱う。また、Viewからのアクション（ボタンの押下など）に応じて必要なアプリケーションロジックを呼び出す。

### popup.html \<temp\> \<entry\>
エントリーポイント。記述は最小限にせよ。

### Popup.spec.tsx \<temp\>
結合テスト。

### index.tsx \<temp\>
popup.htmlから呼び出される実質的なエントリーポイント。
肥大化せぬように。最低限の記述に収め、複雑あるいは長い記述は外部に隔離せよ。
