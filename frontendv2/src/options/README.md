[戻る](../README.md)

*現状不要

# options \<temp\>

## Options.tsx \<temp\>

View(UI)を定義する。アプリケーションロジックとのやり取りはOptionsModel (ViewModel) を介して行う。

## OptionsModel.ts

ViewModel - Viewに必要な全ての情報、値を取得して統合的に扱う。また、Viewからのアクション（ボタンの押下など）に応じて必要なアプリケーションロジックを呼び出す。

## options.html \<temp\> \<entry\>

エントリーポイント。記述は最小限にせよ。

## Options.spec.tsx \<temp\>

結合テスト。

## index.tsx \<temp\>

options.htmlから呼び出される実質的なエントリーポイント。
肥大化せぬように。最低限の記述に収め、複雑あるいは長い記述は外部に隔離せよ。
