[戻る](../README.md)

# index

- [index](#index)
- [概要](#概要)
- [注意](#注意)
- [ディレクトリ](#ディレクトリ)
  - [src \<temp\>](#src-temp)
    - [app \<temp\>](#app-temp)
    - [background \<temp\> \<entry\>](#background-temp-entry)
    - [component](#component)
    - [content \<temp\> \<entry\>](#content-temp-entry)
    - [options \<temp\> \<entry\>](#options-temp-entry)
    - [popup \<temp\> \<entry\>](#popup-temp-entry)
    - [utils \<temp\>](#utils-temp)
    - [welcome \<temp\> \<entry\>](#welcome-temp-entry)
    - [global.css \<temp\>](#globalcss-temp)
    - [manifest.ts \<temp\>](#manifestts-temp)
    - [setupTests.ts \<temp\>](#setupteststs-temp)
    - [typings.d.ts \<temp\>](#typingsdts-temp)
- [ヒント](#ヒント)
  - [処理をbackgroundプロセスに委譲する](#処理をbackgroundプロセスに委譲する)
  - [テストの書き方](#テストの書き方)

# 概要

現状主に活用されているのは

- エントリーポイント
  - popup
  - background
- ソース
  - component
  - app

popupはcomponent/AssignmentListやcomponent/AuthChip等を呼びだす．
AssignmentListやAuthChipは主に, app/assignmentRecord, app/signalv2等によって実現されている．
カレンダーへの課題の取得や，認証が必要な場合はapp/signalv2を利用してbackgroundに処理を行わせる．
処理の状況をモニタするために,app/signalv2のほかにapp/flagが使われている．

backgroundは主にapp/signalv2, app/assignmentFetcher, app/backendWrapper等によって実現されている．
上記の通り，backgroundプロセスにおいてsignalv2のhandlerを登録することで，処理の移譲を実現する．
また，課題一覧の定期的な取得をsetIntervalを用いて実現する．

全体として持つ機能は

- 課題一覧の表示
- 課題ごとのカレンダーへの登録
- 未登録課題のカレンダーへの登録
- カレンダーへの登録のための認証
- 認証状態の表示

である．

# 注意

日付や時間などはTemporalで扱う。

# ディレクトリ

以下にそれぞれのディレクトリの役割を述べる。
ただし、テンプレートの初期時点で存在するファイルには\<temp\>,エントリーポイントを含むディレクトリは\<entry\>を書き添えている。

## src \<temp\>

この階層に新たにディレクトリを作ったり、変更したり、削除してはならない。
ファイルの作成、削除も避けること。

### app \<temp\>

アプリケーションロジックを記述する。
app内に実現したい機能を関した名前を冠したディレクトリを記述する。
また**ここにUIを記述してはならない。**
[詳細](./app/README.md)

### background \<temp\> \<entry\>

サービスワーカー（バックグラウンドプロセス）のエントリーポイント。
appから適切なロジックを呼び出す。
[詳細](./background/README.md)

### component

UIを定義する．

### content \<temp\> \<entry\>

LMSごとに細分される。LMSごとにサイト内容 (DOM) の改変プロセスのエントリーポイントを定める。
componentを利用してページの表示内容を改変するとともに、appから適切なロジックを呼び出す。
[詳細](./content/README.md)

### options \<temp\> \<entry\>

appから適切なロジックを呼び出し、componentを組み合わせて設定ページを構成する。
スマートUI[^1]を避けること。
[詳細](./options/README.md)

### popup \<temp\> \<entry\>

componentを組み合わせてpopupウィンドウを構成する。
スマートUI[^1]を避けること。
[詳細](./popup/README.md)

### utils \<temp\>

開発用の定数を設定する。
型を定義する。
値の整形関数を定義する。
[詳細](./utils/README.md)

### welcome \<temp\> \<entry\>

appから適切なロジックを呼び出し、componentを組み合わせて初回拡張機能インストール時に表示されるページを構成する。
スマートUI[^1]を避けること。
[詳細](./welcome/README.md)

### global.css \<temp\>

拡張機能全体に適用するスタイルを設定する。

### manifest.ts \<temp\>

拡張機能の各エントリーポイント、パーミッション、アイコン、ブラウザ上に表示される拡張機能の名称などを設定する。
contentの更新時にはここも更新すること。また、不要なエントリーポインなどの設定はコメントアウトする。
また、エントリーポイントは各ディレクトリの外に設定してはいけない。

すなわち、popupのエントリーポイントを`app/feature`内に設定したりしてはならない。
かならずpopupのエントリーポイントは必ず`popup`を含むpathで記述されねばならない。e.g. `popup/index.html`

### setupTests.ts \<temp\>

結合テストを行う。

### typings.d.ts \<temp\>

外部ライブラリで定義される型情報を導入する。
`.d.ts`はjsで定義されたTSにおける型が与えられていない関数や値に型を与えるためのファイルなので新たにモジュールを導入したときのみこのファイルを変更する。
ts内で型を定義する場合は`utils/types.ts`内に行うこと。

[^1]: スマートUIとは、UIの記述とロジックの記述が混合した状態。

# ヒント

## 処理をbackgroundプロセスに委譲する

とくにpopupは、UIが非表示になった時点で処理が中止され、処理内容は全て破棄されるので、時間のかかる処理はbackgroundに委譲しなければならない。
本プロジェクトでは移譲の手段として`signalv2`を提供している．

## テストの書き方

`.spec.ts`ファイルを作って、
`yarn test`を実行すればテストしてくれる。
`describe`関数でテストスイートを作り、`it`関数でテストケースをかく。
