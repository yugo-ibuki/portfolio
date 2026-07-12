# Cloudflare Deployment Marker Design

## Goal

Cloudflare Workers Buildsの継続的デプロイが`main`へのpushで動作することを、公開トップページ上の目印で確認する。

## Design

- トップページのコンテンツ先頭に`Deployed via Cloudflare Workers`を表示する。
- 既存コンテンツより目立たない、小さな`muted`カラーのテキストとする。
- 新しいコンポーネントや状態管理は追加せず、`src/app/page.tsx`に静的な文言を置く。
- 文言がトップページにレンダリングされることを自動テストで確認する。

## Verification

- テストを失敗から成功へ進める。
- `bun test`、`bun run lint`、`bun run build`を実行する。
- `main`へpush後、Cloudflareのビルド完了と公開URL上の文言を確認する。
