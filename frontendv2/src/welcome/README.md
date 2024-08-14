[戻る](../README.md)

# ディレクトリ

## welcome \<temp\>

### Welcome.tsx \<temp\>

View(UI)を定義する。アプリケーションロジックとのやり取りはWelcomeModel (ViewModel) を介して行う。

### WelcomeModel.ts

ViewModel - Viewに必要な全ての情報、値を取得して統合的に扱う。また、Viewからのアクション（ボタンの押下など）に応じて必要なアプリケーションロジックを呼び出す。

### welcome.html \<temp\> \<entry\>

エントリーポイント。記述は最小限にせよ。

### Welcome.spec.tsx \<temp\>

結合テスト。

### index.tsx \<temp\>

welcome.htmlから呼び出される実質的なエントリーポイント。
肥大化せぬように。最低限の記述に収め、複雑あるいは長い記述は外部に隔離せよ。
