レポートと指示書を一次情報として読み直し、指摘対象の実ファイルをゼロベースで確認します。まず `.takt/runs/20260415-090549-github-contributions/context/task` と Report Directory、続いて指摘対象ファイル本文を開いて事実確認します。
指示書とポリシーを確認しました。次に Report Directory のレビュー結果を開き、指摘ごとに対象ファイルと実在箇所を照合します。
最新のレビュー結果を `reports/ai-review.md` と時刻付きレポートで確認します。そのうえで、指摘されたソースを直接開いて問題の実在を確認します。
レビュー指摘は 2 件です。対象ファイルの該当箇所を開き、属性とコメントの実在を grep で確認してから修正します。
確認した事実です。`GitContribution` にはレビュー指摘どおり `data-contribution-grid` / `data-animation-state` が残っており、テストもそれに依存しています。`Background3D.tsx` には What/How コメントが残っています。
`GitContribution` では本番 DOM に不要な属性を落とし、テストは既存の `data-direction` / `data-animate` と CSS 変数だけを見る形に直します。続けて `Background3D.tsx` の説明コメントを削除します。
最初の修正は入れました。`Background3D.tsx` には reviewer が列挙していない説明コメントも残り得るので、再度全文を確認して取り切ります。
コード修正は入りました。これからテスト依存箇所を再確認し、プロジェクト定義のスクリプトで検証します。
`GitContribution` の不要属性と `Background3D` の説明コメントは検索上は消えています。次は `bun run test` と `bun run lint` を実行して、実際に通るか確認します。
テストは 5 件とも通りました。lint はまだ実行中なので、出力を回収して最終確認します。
## 確認したファイル
- [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:16): L16-L19 と L98-L101 を確認した結果、`data-contribution-grid` / `data-animation-state` を付与していたため削除しました。
- [src/components/GitContribution/index.test.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.test.tsx:102): L102-L113 と L261-L310 を確認した結果、テストが削除対象の本番 DOM 属性に依存していたため、CSS 変数と `data-direction` / `data-animate` ベースに修正しました。
- [src/components/Background3D.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:37): L37-L203 と L231-L232 を確認した結果、説明コメントが残っていたため削除しました。

## 実行した検索
- `rg -n "data-contribution-grid|data-animation-state|data-direction|data-animate|contribution-animation-duration" src/components/GitContribution/index.tsx src/components/GitContribution/index.test.tsx`
  初回確認で `index.tsx` に不要属性、`index.test.tsx` にその依存を確認しました。
- `rg -n "Dynamically import Three.js|Scene setup|Cleanup function|Don't render anything on server|any\\b|as any" src/components/Background3D.tsx`
  初回確認で reviewer 指摘の説明コメント位置を確認しました。
- `rg -n "data-contribution-grid|data-animation-state|Dynamically import Three.js|Scene setup|Cleanup function|Don't render anything on server|//" src/components/GitContribution/index.tsx src/components/GitContribution/index.test.tsx src/components/Background3D.tsx`
  修正後確認で対象属性と説明コメントが消えていることを確認しました。

## 修正内容
- [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:98): グリッド要素から `data-contribution-grid` と `data-animation-state` を削除し、本番 DOM には実装で使う `data-direction` / `data-animate` と `--contribution-animation-duration` だけを残しました。
- [src/components/GitContribution/index.test.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.test.tsx:102): `queryGrid` を CSS 変数 `--contribution-animation-duration` で解決する形に変更しました。
- [src/components/GitContribution/index.test.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.test.tsx:261): `data-animation-state` 前提の検証を削除し、各セルの `data-animate` が `idle` / `running` に遷移することを直接検証する形に修正しました。
- [src/components/Background3D.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:71): reviewer 指摘の What/How コメントと、同ファイルに残っていた説明コメントを削除しました。

## テスト結果
- `bun run test`: 5 pass / 0 fail
- `bun run lint`: exit code 0, 問題なし