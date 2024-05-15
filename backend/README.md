# 環境

## セットアップ

### windows

`py -3.11 -m venv .venv`
を実行して、venvをインストールする。そのあと
`pip install -r requirements-windows.txt`
を実行して依存関係をインストールする

### ubuntu

`python3.11 -m venv .venv`
を実行して、venvをインストールする。そのあと
`pip install -r requirements-ubuntu.txt`
を実行して依存関係をインストールする

## サーバーの起動

カレントディレクトリを`backend`(このREADME)があるファイルにして、
`uvicorn main:app --reload`
を実行する

# 構成

## 概要

### main.py *ENTRYPOINT

main: *エントリーポイント
サーバーの起動・各種インスタンスの生成を行う

### test.py

テストを行う際、mainと同じディレクトリをワーキングディレクトリとし、モジュールの呼び出しなどを行うためにこの階層に設置されている。
`python3 test.py`を実行して実行するテストを選択する。

### DEPLOY_SETTING

デプロイする際に必要な設定や認証情報の設置場所であり、
これら情報を定数として提供する。設定の記入方法は`dummy.`に従う。ただし実際の設置時には`dummy.`を除いたファイル名を使用すること。

@developpers: `dummy.`ファイルを削除しないように。

スクリプトとしての機能は環境変数を読み込むだけなので、すべての処理が`__init__.py`内に記述されている。 
[詳細](DEPLOY_SETTING/README.md)

### AuthHandler

APIなどの利用に歳する認証フローを扱うプログラムがここに配置される。
今のところはGoogleCalenderAPIしか扱わないが、拡張性のために抽象化レイヤーとして置かれている。
[詳細](AuthHandler/README.md)

### AssignmentRegister

フロントエンドからAssignment構造体を受け付け、GoogleCalenderに登録する。
[詳細](AssignmentRegister/README.md)

### server

サーバーの設定を担う。

### tests

テストコードの置き場所。担当範囲以外のテストは書き換えないこと。
また、テストコードは書くこと。いくら言葉を尽くして動作することを説明しても、テストが動作するという事実には及ばない。

## エラーハンドリング

ユーザー定義例外は`exceptions.py`に定められている。
エラーはどこでも送出される可能性があるが、エンドポイントを直接定義する関数において、フロント側へのレスポンスに変換される。

Frontに返送するExceptionはfastAPIのHTTPExceptionを継承すること。

# コードリーディングのヒント

## エンドポイント

エンドポイントは各パッケージ内で必要に応じて定義されている。

```python
@APP.get("/xxx")
def xxx():
    ...
```

のように定義されたエンドポイントは`http(s)://{domain}/xxx`でアクセスされる。`get`の部分はメソッドである。
つまり、`GET`methodで`http(s)://{domain}/xxx`を読んだときに実行される処理が上記の関数の内部に記述される。

実際にどのような流れで実行されるのかを把握するには
エントリーポイントである`backend/main.py`からたどるか、各エンドポイントからたどると良い。

## ファイル名

### `__init__.py`

`__init__.py`はおまじない。パッケージを読み込む際の初期化処理をしているが、よくわからなければ気にしなくて良い。
ただし、新しく作成したディレクトリにはこれをおいて、

```Python
from .main import {作成したクラスや定数名}
```

と書くこと。これを書くと、インポートの際に`main`を省略できる。

e.g.

```
\a
|-\b
| |-__init__.py
| |-main.py
|-\c
| |-main.py
|-super.py
```

a\b\main.py
```python
SOME_CONSTANT_VALUE="b_package"
```

a\c\main.py
```python
SOME_CONSTANT_VALUE="c_directory"
```

としたとき、

super.py
```python
from b import SOME_CONSTANT_VALUE as B_CONST
from c.main import SOME_CONSTANT_VALUE as C_CONST
```

とは書けるが

super.py
```python
from c import SOME_CONSTANT_VALUE as C_CONST
```

とは書けない(cは.mainを省略できない)ということである。

### main.py

各パッケージにおいて核となる処理(パッケージの外側に公表する処理)は`main.py`に書く。

# コーディングのヒント

- エンドポイントの定義は各クラスにおいて`defEndpoints`というメソッドの中で行うことを推奨する。
- 責任範囲を逸脱しそうなときはパッケージを分けること。分離したパッケージの実装にはとらわれずに、とりあえずmockを作って置くことを勧める。
- ディレクトリ構成を根本から変更する場合はメンバーと連絡を取りながら行うこと。
- ドキュメントを書くこと。パッケージに数行程度のREADME.mdを配置しよう。
- リテラル("kouiuno"や123)の使用を避けること。バグの元。
- ファイル名が含むクラスを適切に抽象化していることを確かめること。包含概念が見つからない場合ファイルを分ける。
- リテラルをコードした定数やExceptionsのファイルは分けること。

