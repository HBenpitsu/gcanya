# frontend開発者向けドキュメント

## ディレクトリ

使用したテンプレート自体のreadmeは[templeteREADME.md](./templeteREADME.md)に移行。

本拡張機能の開発者が直接変更を加えるのはsrc内のファイルのみ。
ただし、拡張機能のアイコンは`public/images`のものを差し替えて変更すること。

src内のディレクトリの構成についての詳説は[`src`内のREADME](./src/README.md)で述べる。

## 環境構築

React@TSを使用する。
TS(TypeScript)はJavaScriptの派生なので、
まずはJavaScriptのランタイムである`Node.js`のバージョン管理ツール,npmを使えるようにする。

npmが用意できたら、

```:console
npm install -g yarn
```

を実行して、yarnをインストール。
`./frontend`をカレントディレクトリとして、

```:console
yarn install
```

を実行すれば必要なパッケージが自動でインストールされてセットアップは完了。

## ビルド

```:console
yarn build
```

でビルドされる。`dist`というフォルダができるので、これをブラウザに読み込ませれば良い。

```:console
yarn dev
```

でホットリロード（変更があるたびにビルドされる）が有効になる。

## テンプレート及び拡張機能の挙動

拡張機能は単一のプロセスではなく、複数のプロセスからなる。例えば、バックグラウンドプロセスとpopupを表示するプロセスは異なる。
popupのプロセスはpopupを表示している間しか動かない（非表示になると中止される）ため、popupプロセス上でアニメーション用途以外でコルーチンやPromiseを用いてはならない。

また、ページを表示することもできるが、これも異なるプロセスで実行されることに注意せよ。
（すなわち変数の状態などが素朴に共有されることはない。）

それぞれのプロセスのエントリーポイントはmanifest.tsに記述されている。

## TypeScriptの挙動

### index.ts

`index.ts`はpythonでいう`__init__.py`のようなもので、`index.ts`が配置されているディレクトリがimportされたとき、代わりに`index.ts`がimportされる。