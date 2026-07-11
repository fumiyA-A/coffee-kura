# Coffee Kura v1.0

豆カードを中心に、自宅で淹れた一杯とカフェで飲んだ一杯を記録し、自分の好みを知るためのモバイル向けWebアプリです。

## v1.0機能

- 豆カード：追加・編集・削除・写真・検索・並び替え・お気に入り
- Brew：豆に紐づく一杯の記録、レシピ、味評価、写真
- Cafe：カフェの一杯の追加・一覧・詳細・削除
- Insights：件数、平均評価、産地・焙煎度・ロースター傾向、平均味プロファイル
- Settings：JSONバックアップ、復元、全データ削除
- IndexedDBへの端末内保存
- GitHub Pages自動デプロイ

## 起動

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## ビルド

```bash
npm run build
```
