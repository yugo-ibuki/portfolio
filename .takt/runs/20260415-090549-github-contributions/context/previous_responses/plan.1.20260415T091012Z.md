タスク指示書と参照資料を先に確認し、そこから現行コードとの差分と影響範囲を確定します。続けてレポート履歴と関連実装を読み、実装フェーズ向けの具体的な方針に落とします。
参照資料は `order.md` に明示された6ファイルだけでした。次にその6ファイルと既存レポート履歴を読み、要件ごとの変更要否をコード根拠つきで切ります。
参照資料にある `MotionSection.tsx`、`motion.ts`、`MotionSection.test.tsx` は現ワークツリーに存在しませんでした。代替参照にはせず、この欠落を前提に、実装対象そのものと周辺コードの現状を追加で調べます。
現状の参照資料からは、アニメーション基盤やテスト基盤の既存ファイルは見つかっていません。ここからは `GitContribution` 自体の依存関係と、実装時に追加配線が必要になる箇所をコードで確定します。
`GitContribution` の依存はかなり閉じていて、入口はトップページの `Contributions` セクションだけでした。仕上げとして、完成形の色決定とテスト実行条件を確認し、実装手順を固定します。
`@components` のエクスポート面も確認していて、`GitContribution` はページから直接 import される単純な構成です。追加の公開 API は不要そうなので、あとは設計を `GitContribution` 内に閉じる前提でまとめます。
テストは現時点で雛形も依存も見当たらないので、後続ステップで詰まりやすい箇所です。`bun test` の実行前提だけローカルツールで確認して、テスト方針を現実的なものに絞ります。
最後に、テストで DOM を前提にできるかだけ確認します。ここが使えないなら、後続では純粋関数に分けてテスト可能面を増やす設計に寄せる必要があります。
調査は終わりました。実装フェーズ向けの方針は、`GitContribution` に再入可能な可視判定とセル単位の方向付けを閉じ込め、`global.css` に 3 秒完了の組み立てアニメーションを足し、テストは新規に `GitContribution` 側へ寄せる形が最短です。
**前提**
参照資料のうち `src/components/MotionSection.tsx`、`src/lib/motion.ts`、`src/components/MotionSection.test.tsx` は現ワークツリーに存在しませんでした。レポート履歴も `/.takt/runs/20260415-090549-github-contributions/reports/` 配下に実ファイルがなく、参照できる実行履歴はありません。

**要件判定**
- 変更要: `GitHub contributions` の描画本体は [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:15) にあり、現状はセルを静的描画しているだけです。[同:31](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:31)
- 変更要: 各セル個別アニメーションは未実装です。寄与セルは [同:57](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:57)、空セルは [同:42](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:42) の固定クラスのみです。
- 変更要: 上下左右方向の情報はコード上に存在しません。[src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:35)
- 変更要: 再入トリガーの可視判定は未実装です。`IntersectionObserver` 系の利用は `src/` に見当たりません。
- 変更要: 3 秒完了の animation 定義は未実装です。既存 CSS の keyframes は背景用 `float` のみです。[src/style/global.css:110](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/style/global.css:110)
- 変更不要: `Contributions` セクションへの到達経路自体はすでにトップページにあります。[src/app/page.tsx:18](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/app/page.tsx:18) から [同:23](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/app/page.tsx:23)
- 変更不要: 完成後の見た目の色決定は既存 `getColor` を維持すれば足ります。[src/lib/getColor.ts:1](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/lib/getColor.ts:1)
- 変更不要: ローディング・エラー分岐は既存のまま維持できます。[src/components/GitContribution/index.tsx:19](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:19) と [同:23](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:23)

**設計**
実装は `GitContribution` 内に閉じるのが適切です。呼び出し元はトップページ 1 箇所だけで、共有モーション基盤の参照先も欠落しているため、`page.tsx` や新しい公開 API に広げる理由がありません。

推奨構成は次です。
- [src/components/GitContribution/index.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:15) に可視判定用 `ref` と `IntersectionObserver` を追加し、`isInView` か `animationCycle` をローカル state で管理する
- 同ファイルに `CONTRIBUTION_ASSEMBLY_DURATION_MS = 3000` と、セルごとの方向を決める純粋関数を置く
- 各セルに `data-direction`、必要なら `data-animate` と CSS 変数 (`--contribution-delay`, `--contribution-duration`) を付与する
- [src/style/global.css](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/style/global.css:1) にセル用 keyframes と direction 別の初期 transform を追加し、最終状態は現行レイアウトへ戻す
- `src/lib/motion.ts` は欠落しており、今回の用途は `GitContribution` 専用なので追加しない。duration はコンポーネントから CSS 変数で渡して重複を避ける

**実装方針**
- セル方向は乱数ではなく決定的関数にする。`weekIndex` と `dayIndex` から `top/right/bottom/left` を割り当てれば、再描画やテストで安定します。
- 再入再生は「画面外で animation 状態を解除し、再入時に再付与」で足ります。全セクション remount は不要です。
- アニメーション対象は寄与セルと空セルの両方に揃えるべきです。現行実装では両方が同じグリッドのマスだからです。[src/components/GitContribution/index.tsx:37](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:37)
- 既存 Tooltip 構造は維持し、`button` へクラスや data 属性を足す方針にします。[同:55](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:55)

**Coder 向けガイドライン**
- 既存実装パターンとして、グリッド生成ループは [src/components/GitContribution/index.tsx:35](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/GitContribution/index.tsx:35) をそのまま土台に使う
- 色の完成形は [src/lib/getColor.ts:1](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/lib/getColor.ts:1) を変えない
- 到達経路は [src/app/page.tsx:19](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/app/page.tsx:19) の `Contributions` セクション配下のみ。追加配線が必要ならここだけ確認すればよいが、現時点では変更不要
- 影響範囲は `GitContribution` 本体、グローバル CSS、新規 `GitContribution` テスト。`useGitContribution` と `useCalendar` の取得ロジックはそのままでよい
- アンチパターン:
  - グリッド全体 1 要素だけを動かす
  - 方向を render ごとにランダム決定する
  - `page.tsx` 側に observer 状態を持ち上げる
  - 完了後の見た目を現在の色・配置から変えてしまう
- テストは新規 `src/components/GitContribution/*.test.tsx` を想定するのが自然です。参照資料の `MotionSection.test.tsx` は存在しないため流用不可です

**テスト方針**
- 方向付けと 3 秒設定は純粋関数・data 属性・CSS 変数で検証可能にする
- 再入判定は `IntersectionObserver` をモックして、`false -> true -> false -> true` の遷移で animation 状態が再付与されることを確認する
- ただし現状は `node_modules` がなく、DOM テスト基盤も未導入です。後続ステップでは最小限の DOM 実行環境を先に整える前提で進める必要があります