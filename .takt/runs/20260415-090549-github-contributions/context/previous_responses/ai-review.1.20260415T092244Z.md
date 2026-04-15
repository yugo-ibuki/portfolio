タスク指示、レビュー用ポリシー、今回の実装差分を先に突き合わせます。このステップでは編集せず、変更がタスク契約と既存実装パターンに合っているかを AI 特有の観点で洗います。
差分は `GitContribution` 本体、グローバル CSS、テスト基盤、テスト追加に集中しています。ここからは要件と既存コードベースとのズレ、AI が盛りがちな余計な実装、未使用コードの混入を差分単位で確認します。
差分単体では判断しにくいので、既存の `GitContribution` 周辺と類似パターンも見ます。特に `IntersectionObserver` の使い方と、今回追加された DOM 属性やテスト基盤が既存流儀から浮いていないかを確認します。
実コードとテスト契約は読めました。次に実行結果も確認して、見た目だけ整っていて実際は動かない AI 由来の誤配線がないかを潰します。
ひとつ具体的な再現ポイントが見えています。`package.json` に依存追加があるのに `bun.lock` が更新されていないので、クリーン環境で壊れないかを確認します。
**Findings**

1. `finding_id: ai-review-001` `new` [package.json](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/package.json:10)  
   `lint` script がまだ `next lint` のままです。Next.js 16 ではこの呼び方が成立せず、実際に `bun run lint` は `Invalid project directory .../lint` で失敗しました。今回 `package.json` を変更しているので、この古いパターンの放置はボーイスカウト対象です。`eslint .` など実際に通る lint コマンドへ置き換え、`bun run lint` を通してください。

2. `finding_id: ai-review-002` `new` [package.json](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/package.json:50)  
   新規追加した `@happy-dom/global-registrator` に対応する `bun.lock` 更新がありません。`rg 'global-registrator|happy-dom' bun.lock` でも一致が出ず、現状はローカル `node_modules` に依存してテストが通っているだけです。AI 実装でありがちな「ローカルでは動くがクリーン環境で再現できない」状態なので、`bun.lock` を更新して依存解決を確定させてください。

3. `finding_id: ai-review-003` `new` [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:27), [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:69), [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:114)  
   `cycle` と `data-animation-cycle` は実際のアニメーション制御に使われていません。CSS もコンポーネント本体も `idle` / `running` しか見ておらず、このカウンタはテストのためだけに runtime DOM へ漏れている状態です。要件外の test hook を本番コードに持ち込んでいるので、`cycle` を削除し、再入判定は既存の `data-animate` / `data-animation-state` の遷移でテストしてください。

**判定**

`REJECT`

`bun run test` と `bun run build` は通りましたが、`bun run lint` は失敗しています。今回の差分には、再現性不足と test-only 実装混入も残っています。