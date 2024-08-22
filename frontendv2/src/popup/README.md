[戻る](../README.md)

# 注意

popupプロセスは、popupが非表示になったと同時に中止される（破棄される）ので、popupプロセスで時間のかかる処理を行ってはならない。
必ずbackgroundに移譲せよ。

# popup \<temp\>

## Popup.tsx \<temp\>

componentを組み合わせてPopupを構成する．

## popup.html \<temp\> \<entry\>

エントリーポイント。記述は最小限にせよ。
（基本的に変更の必要はない）

## Popup.spec.tsx \<temp\>

結合テスト。

## index.tsx \<temp\>

popup.htmlから呼び出される実質的なエントリーポイント。
肥大化せぬように。最低限の記述に収め、複雑あるいは長い記述は外部に隔離せよ。
