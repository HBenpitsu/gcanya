# 環境

拡張機能開発者が変更するものは全てsrc内にある。[src内のREADME.md](./src/README.md)

## セットアップ

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

でビルドされる。`dist`というフォルダができるので、これをChromeに読み込ませれば良い。
TODO: 読み込ませ方の詳細を記述する。
(Firefoxの場合は別の手順を取る必要がある。)

```:console
yarn dev
```

を使うと、ホットリロード（変更を加えたたびにビルドし直される設定）が有効になる。

# 概要

拡張機能の開発者が更新する内容は全て`src`内にある。
ただし、拡張機能画像のアイコンリソースについてはpublic/imagesのものを差し替えること。
(これは良い方策か？要検討->src内にimgディレクトリを作っても良いのでは？)
