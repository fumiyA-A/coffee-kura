# AGENTS.md

Coffee Kuraは、豆カードを中心にコーヒーの好みを発見するモバイルファーストWebアプリです。

## Stack
- Vite / React / TypeScript / Tailwind CSS
- Native IndexedDB
- GitHub Pages

## Core
- Bean 1 : Brew N
- CafeCupは別枠
- Beans / Cafe / Insights
- Settingsは歯車
- サーバー・認証・Supabaseは追加しない
- データは端末のIndexedDBに保存
- 写真は複数枚を許可し、保存前に圧縮する
- 日付表示はYYYY/MM/DD
- 産地はsingle / blend / unknownとorigins[]で保持
- 店舗は一度登録したものを再利用する
