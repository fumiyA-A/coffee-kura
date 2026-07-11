# Coffee Kura

Coffee Kuraは、豆カードを中心に、自宅で淹れた一杯とカフェで飲んだ一杯を記録し、自分の好みを知るためのモバイル向けWebアプリです。

## 現在の実装

- Vite + React + TypeScript
- Tailwind CSS
- GitHub Pages
- ハッシュルーティング
- IndexedDBの初期データベース
- Beans / Cafe / Insights / Settings の仮画面

## Codespacesで起動

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## ビルド

```bash
npm run build
```

## GitHub Pages

`main` ブランチへpushすると、`.github/workflows/deploy.yml` により自動で公開されます。

GitHubのリポジトリ設定で、PagesのSourceを **GitHub Actions** に設定してください。
