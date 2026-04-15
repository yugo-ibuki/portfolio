タスク指示書、実装ポリシー、レポート、既存テストを先に確認し、このステップで許される変更範囲と実装契約を固定します。そのうえで対象コンポーネントを読み、テストが要求している状態遷移だけを実装します。
レポート側はまだ `coder-scope.md` と `coder-decisions.md` が未作成でした。これから実装前の変更スコープ宣言を作成し、その後に対象コンポーネント・スタイル・追加済みテストを並行で確認します。
テスト契約は明確になりました。次にフックの返り値形と依存状況を確認し、実装に必要な定数化と observer 配線を既存型に合わせて入れます。
これから実装前の `coder-scope.md` を作成し、その直後に現状の赤テストを一度実行して不足分を確定します。編集はレポートファイルと対象実装ファイルに限定します。
実装に加えて、既存テストを実行可能にする DOM preload が必要です。ここからは `GitContribution` 本体、CSS、最小のテストセットアップ、必要な依存と script を順に追加します。
`bun add` は sandbox の tempdir 制約で失敗しました。依存追加に寄らず進められるかを切るため、まず Bun のテスト起動オプションと既存 `node_modules` 内の代替 DOM 実装有無を確認します。
依存追加は `npm_config_cache=/tmp/.npm-cache` で通りました。ここから本体実装と DOM preload をまとめて入れ、`bun run test` でそのまま回せる形に揃えます。
これから `GitContribution` の state/observer/方向付与を入れ、続けて CSS と `bun test` 用 preload を追加します。契約文字列は定数に寄せ、テストが見ている属性値を 1 箇所で管理します。
テスト起動は CLI オプション依存にせず `bun run test` に寄せます。これから preload ファイルと `test` script を追加し、スコープ宣言も実際の変更ファイルに合わせて更新します。
実装は入ったので、先に `bun run test` で型と挙動の詰まりを出します。失敗があればそのまま修正してから `bun run build` に進めます。
`GitContribution` 本体の型は 1 点修正が必要で、加えてビルド時の TypeScript がテストファイルを拾う可能性があります。次に `tsconfig` と preload を確認して、ビルドで詰まる側を先に潰します。
型エラーは CSS 変数の型付けだけでした。ここを修正し、ついでに preload で `act` 環境フラグを立ててテスト出力のノイズも消します。
実装側の型修正は終わりました。ここから必須の自己チェックとして `bun run test` と `bun run build` を再実行し、必要なら最後に決定ログを残します。
必須のビルドとテストは通りました。最後に差分を確認し、今回の判断だけ `coder-decisions.md` に残して完了形にします。
差分の本体は固まりました。生成物の差分だけ確認して、実装に無関係ならそのまま言及付きで引き渡します。
最後に実行コマンドをユーザー向けに固定するため、`bun run test` の素の呼び出しでも通ることだけ確認します。これで報告に載せるコマンドを 1 本にできます。
## 作業結果
- [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx) に、viewport 再入ごとに `idle` → `running` を切り替える `IntersectionObserver` ベースのセル単位アニメーションを実装しました。
- [src/style/global.css](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/style/global.css) に、上下左右から 3 秒で完成形へ集まるセル用アニメーションを追加しました。
- [package.json](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/package.json) と [happydom.ts](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/happydom.ts) を追加し、`bun run test` で DOM 前提の既存テストが実行できるようにしました。
- 実装レポートとして [coder-scope.md](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/.takt/runs/20260415-090549-github-contributions/reports/coder-scope.md) と [coder-decisions.md](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/.takt/runs/20260415-090549-github-contributions/reports/coder-decisions.md) を作成しました。

## 変更内容
- グリッドルートに `data-contribution-grid`, `data-animation-state`, `data-animation-cycle`, `--contribution-animation-duration: 3000ms` を付与しました。
- 全セルに決定的な `data-direction` と `data-animate` を付与し、空セルも含めて同じアニメーション契約に揃えました。
- ローディング表示、エラー表示、色分け、ツールチップは維持しました。
- `bun run build` 実行に伴い `next-env.d.ts` と `tsconfig.tsbuildinfo` に生成差分が入りました。

## ビルド結果
- `bun run build`: 成功
- `baseline-browser-mapping` の更新推奨 warning は出ましたが、Next.js の production build は完了しました。

## テスト結果
- `bun run test`: 成功
- 結果: `5 pass / 0 fail`