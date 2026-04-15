指摘内容をゼロベースで確認します。まず `.takt/runs/20260415-090549-github-contributions/context/task` とレポート、加えて今回の `knowledge` と `policy` の元ファイルを開いて、修正対象と根拠を事実ベースで洗い直します。
仕様とポリシーは確認しました。次に、今回の一次情報であるレポート群を開いて、未修正とされている指摘を対象ファイルと grep で突き合わせます。
`Background3D.tsx` の実物を確認しました。レビュー指摘どおり `let scene: any` 系と `mesh.material as any` が残っていたので、このファイルだけを最小限修正して具体型へ置き換えます。
`any` 除去に加えて、同じ修正範囲で `resize` リスナーの cleanup も実際に解除される形へ揃えました。これから該当箇所を再読し、`bun run lint`、`bun test`、`bun run build` で検証します。
lint と test は進んでいます。`build` の最終結果だけ回収して、問題なければ確認結果を整理して報告します。
## 確認したファイル
- [.takt/runs/20260415-090549-github-contributions/context/task/order.md](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/.takt/runs/20260415-090549-github-contributions/context/task/order.md:1)
- [.takt/runs/20260415-090549-github-contributions/reports/ai-review.md](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/.takt/runs/20260415-090549-github-contributions/reports/ai-review.md:1)
- [src/components/Background3D.tsx](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:31)

## 実行した検索
- `rg -n "\\bany\\b|mesh\\.material" src/components/Background3D.tsx`
  初回確認で `let scene: any`、`camera: any`、`renderer: any`、`objects: any[]`、`mesh.material as any` の実在を確認しました。
- `rg -n "\\bany\\b|mesh\\.material|handleResize" src/components/Background3D.tsx`
  修正後、明示的な `any` が消え、`mesh.material` は具体型のまま扱えていることを確認しました。

## 修正内容
- [src/components/Background3D.tsx:31](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:31) を確認した結果、レビュー指摘どおり `scene`、`camera`、`renderer`、`objects` が `any` で宣言されていたため、`Scene | null`、`PerspectiveCamera | null`、`WebGLRenderer | null`、`BackgroundMesh[]` に修正しました。
- [src/components/Background3D.tsx:4](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:4) に Three.js の型 import と `BackgroundMesh` 型エイリアスを追加し、`objects` と `mesh.material` の型を具体化しました。
- [src/components/Background3D.tsx:142](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:142) を確認した結果、アニメーション内で `scene` / `camera` / `renderer` の未初期化考慮がなかったため、null ガードを追加しました。
- [src/components/Background3D.tsx:196](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:196) を確認した結果、`mesh.material as any` が存在したため、`MeshBasicMaterial` の具体型として `mesh.material.opacity` を直接更新する形に修正しました。
- [src/components/Background3D.tsx:213](/Users/yugo/ghq/github.com/yugo-ibuki/takt-worktrees/20260415T0906-wotasuku-ni-tosutame-mazu-gith/src/components/Background3D.tsx:213) を確認した結果、`resize` リスナーの cleanup が noop 解除になっていたため、同一ハンドラ参照を保持して正しく `removeEventListener` する形に修正しました。

## テスト結果
- `bun run lint`  
  成功。`eslint .` は exit code 0 でした。
- `bun test`  
  成功。5 件 pass、0 fail。
- `bun run build`  
  成功。Next.js build は完了しました。`baseline-browser-mapping` の更新推奨 warning は出ましたが、build 自体は通っています。