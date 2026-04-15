タスク指示書・ポリシー・計画レポートを先に確認し、このステップで許されている変更範囲を固定します。続けて既存の対象コードとテスト基盤を読み、実装前テストとしてどこまで具体化できるかを切ります。
計画レポートは `plan.md` だけでした。次に実装対象の現状と既存テストパターンを読み、テストで固定すべき振る舞いをコード基準で詰めます。
`src` 配下には既存テストがありませんでした。ここからはテストランナーと依存、対象コンポーネントが持つ入力形を確認して、新規テストの置き場所とモック方針を固めます。
テスト基盤は未整備で、`package.json` に test script もありません。ただしこの段階では失敗前提の赤テストを書けばよいので、まず `bun test` で現在の素の挙動を見て、必要なテストファイル形を合わせます。
これから新規の `GitContribution` コンポーネントテストを追加します。対象はローディング・エラー維持、セル単位の direction と 3 秒設定、viewport 再入での再生状態の 3 系統に絞ります。
テストファイルは追加しました。次に `bun test` を実行して、未実装由来の失敗と、テスト自体の import・ランナー問題を切り分けます。
`bun test` はランナー側で `react/jsx-dev-runtime` 解決に失敗しました。これは未実装失敗ではなくテスト自体の成立条件なので、まず依存が未展開なのか、JSX runtime を避ければ進めるのかを確認します。
ローカルでは `node_modules` 自体が未展開でした。テスト内容の是非とは別問題なので、既存 lockfile を使って依存を入れ、`bun test` が少なくともテストファイルを読める状態まで持っていきます。
依存展開を進めています。完了後に再度 `bun test` を回して、未実装起因の赤テストまで到達できるか確認します。
`bun install` 自体は tempdir 権限で止まりました。これはワークスペース外の一時領域解決なので、`TMPDIR=/tmp` を明示して再試行します。
現状の失敗は未実装ではなく、`bun test` が DOM を持たないことが原因です。ランナー側で DOM を有効化できるならテストファイルはそのまま使えるので、まず `bun test --help` で切り替え手段を確認します。
Bun の公式資料では、DOM テストには `@happy-dom/global-registrator` を preload で入れる方式でした。リポジトリ変更はテストファイルのみに制限されているので、まず依存が既に入っているかを確認し、入っていなければこの段階では DOM 実行不能として扱います。 Sources: https://bun.sh/docs/test/dom, https://bun.sh/docs/cli/test
DOM 未設定時の失敗が `ReferenceError` だとノイズが多いので、テスト側で明示エラーに整えます。これで `bun test` の結果が「未実装」なのか「DOM 前提不足」なのか判別しやすくなります。
テスト追加自体は終わっていて、`bun test` は現在 DOM 環境不足で止まる状態まで整理できました。仕上げに差分を確認し、後続の implement ステップがそのまま受け取れる形にします。
追加したのは [src/components/GitContribution/index.test.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.test.tsx) だけです。プロダクションコードは触っていません。

このテストで固定した契約は次です。
- ローディング時は既存のスピナーを出す
- エラー時は既存メッセージを出す
- 通常描画時はグリッドルートに `data-contribution-grid`、`data-animation-state`、`data-animation-cycle`、`--contribution-animation-duration: 3000ms` を持つ
- 全セルが `data-direction` と `data-animate` を持つ
- viewport 侵入で `running`、離脱後の再侵入で cycle が進み再生し直す

検証として `TMPDIR=/tmp bun test` を実行しました。現在は 5 件とも失敗で、失敗理由は未実装ではなく DOM 環境不足です。テスト側には明示エラーを入れてあり、`happy-dom` preload などで DOM を用意しない限り `GitContribution tests require a DOM environment...` で止まります。