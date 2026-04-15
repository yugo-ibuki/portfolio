指摘内容をゼロベースで確認します。まず `.takt/runs/20260415-090549-github-contributions/context/task` とレポート、ポリシー、知識ソースを読み、今回修正対象になっているファイルと問題箇所を事実ベースで洗い出します。
レポートの一次情報が `reports/ai-review.md` だと分かったので、そこを起点に今回の未修正指摘を確認します。合わせて `order.md` とポリシー全文を読み、修正範囲を固定します。
今回の REJECT は `package.json` の `lint` だけです。対象ファイルの現状と、その変更で壊れる可能性がある設定を確認してから最小修正に入ります。
`eslint .` に戻したときの挙動を先に確認しています。無視設定と ESLint 設定を読んで、repo-wide に戻しても不要な巻き込みがないか見ます。
事実確認は十分できました。`package.json` の `lint` が 3 ファイル限定に縮んでいるのを確認したので、repo-wide lint に戻し、必要なら局所確認用コマンドを分離します。
編集前に repo-wide lint の実態を確認します。ここで既存違反が出るなら、`lint` を戻すだけでは品質ゲートが壊れるので、合わせて必要分を直します。
ESLint を repo 全体に掛けています。結果次第で `package.json` だけで済むか、追加修正が必要かを切り分けます。
前回の実装でどう検証していたかも確認します。`lint` の縮退がどのタイミングで入ったかを見るため、既存レポートの実行履歴を読んでいます。
`eslint .` を実際に流した結果、縮退の背景は `.next` を拾うことと既存の数ファイルの lint 違反でした。レビュー指摘に正面から対応するには、`lint` を repo-wide に戻したうえで、無視設定を flat config 側へ移し、実在する違反だけを直す必要があります。
これから編集します。変更は `lint` の契約復元、flat config への ignore 移行、repo-wide lint を塞いでいる実ファイルの最小修正に絞ります。
手修正は入れました。次に touched files を整形して、repo-wide lint を再実行します。
`lint` を repo-wide で回しています。ここが通ればレビュー指摘の本丸は解消です。
`bun test` は通りました。最後に `bun run build` を回して、repo-wide lint 復元でビルドが崩れていないかを見ます。
ビルドで `use-toast.ts` の型定義だけ崩れているのを確認しました。`ActionType['ADD_TOAST']` が文字列 union に対して不正なので、ここを literal 型に直して再検証します。
型の参照先を直したので、未使用になった別名があれば一緒に落とします。そのまま `lint` と `build` を再実行します。
最終報告用に、実際に触った箇所の行番号を取り直しています。報告はレビュー指摘の確認結果と、lint を通すために修正した実ファイルを分けて具体化します。
## 確認したファイル
- [package.json](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/package.json:10)
- [eslint.config.js](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/eslint.config.js:5)
- `.eslintignore:1`
- [src/components/Background3D.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:1)
- [src/components/List/Work.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/List/Work.tsx:1)
- [src/components/MobileHeader.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/MobileHeader.tsx:1)
- [src/components/hooks/use-toast.ts](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/hooks/use-toast.ts:25)

## 実行した検索
- `rg -n "\"lint\"|eslint" package.json eslint.config.js . -g 'package.json' -g 'eslint.config.js' -g '.eslint*'`
  `package.json:10` の `lint` が 3 ファイル限定になっていることを確認しました。
- `rg -n "eslint src/components/GitContribution/index.tsx src/components/GitContribution/index.test.tsx happydom.ts|\"lint\"" package.json`
  レビュー指摘どおり、縮退した `lint` script が実在することを再確認しました。
- `bunx eslint .`
  `.next` と `next-env.d.ts` を拾っていたこと、および `Background3D.tsx` などの既存 lint 違反が repo-wide lint の復元を妨げていることを確認しました。

## 修正内容
- [package.json](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/package.json:10) の `lint` を確認した結果、問題の 3 ファイル限定スクリプトが存在したため、`eslint .` に修正しました。
- [eslint.config.js](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/eslint.config.js:5) を確認した結果、flat config 側に ignore 定義がなく `.eslintignore` 依存になっていたため、`.next/**` と `next-env.d.ts` などの ignore を config に移し、`.eslintignore` を削除しました。
- [src/components/Background3D.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:3) を確認した結果、未使用の `useCallback` import、boolean 命名規約違反、全体の整形崩れが存在したため、import 削除・`shouldReduceMotion` への改名・Prettier 整形を実施しました。
- [src/components/List/Work.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/List/Work.tsx:4) を確認した結果、未使用の `Badge` import が存在したため削除しました。
- [src/components/MobileHeader.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/MobileHeader.tsx:3) を確認した結果、未使用の `ImWink` import が存在したため削除しました。
- [src/components/hooks/use-toast.ts](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/hooks/use-toast.ts:25) を確認した結果、`actionTypes` が型用途にしか使われておらず lint 違反になっていたため、文字列リテラル union に置き換えました。さらに build 時に `ActionType['ADD_TOAST']` が壊れていたため、`type` を各 literal 型に修正しました。

## テスト結果
- `bun run lint`
  成功。repo-wide lint が通ることを確認しました。
- `bun run test`
  成功。`src/components/GitContribution/index.test.tsx` の 5 件がすべて pass しました。
- `bun run build`
  成功。Next.js build は通過しました。`baseline-browser-mapping` の更新案内は warning のみで、ビルド失敗ではありません。