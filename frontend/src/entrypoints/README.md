[戻る](../README.md)

# entrypoints

ここに配置されるファイルが肥大化しないように十分注意すること。

各機能
- popupウィンドウ
- サイト内容改変(content)
- backgroundプロセス
- optionページ
の実行ポイントを配置する。実行といえどもそれらはhtmlだったりtsだったりtsxだったりするが、そのあたりはうまく読み替えて下さい。

これは`manifest.ts`内で以下のように定義されている。

- backgroundプロセス

```ts
  background: {
    service_worker: 'entrypoints/background.ts',
  }
```

- サイト内容改変(content)

これは各LMSごとにファイルを作成すること。例えば: 

```ts
  content_scripts: [
    {
      matches: ['https://tact.ac.thers.ac.jp/*'],
      js: ['tact_content.tsx'],
    },
  ]
```

- optionページ

```ts
  options_ui: {
    page: 'entrypoints/options.html',
    open_in_tab: true,
  }
```

- popupウィンドウ

```ts
  action: {
    default_popup: 'entrypoints/popup.html'
  }
```