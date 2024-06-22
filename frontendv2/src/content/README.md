[戻る](../README.md)

# ディレクトリ

## content \<temp\>
LMSごとにサイト内容 (DOM) の改変プロセスのエントリーポイントを定める。

### SHARED
LMSに独立に記述できるUIを記述する。
なるべく多くをSHAREDに記述し、後述のエントリーポイントへの記述をなるべく減らすこと。

#### SHARED/Content.tsx \<temp\>
UIを記述する。アプリケーションロジックとのやり取りはContentModel (ViewModel) を介して行う。

#### SHARED/Content.spec.tsx \<temp\>
結合テスト

#### SHARED/twind.ts \<temp\>
tailwindを再現したモジュールを初期化する。

### 各LMS名を冠したファイル \<entry\>

- NuTACT.tsx
- NuMoodle.tsx

など。アクセスするサイトに応じてエントリーポイントとなるファイルを変える。
ここへの記述は最小限に収める。
おそらく、SHAREDに記述されたAIを埋め込むための記述に始終することになる。
