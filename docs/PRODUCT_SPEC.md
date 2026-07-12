# Coffee Kura Product Specification

## Core concept

中心は豆カード。そこに自宅で淹れた一杯の記録が紐づく。カフェで飲んだ一杯は別枠で記録し、将来の好み分析に利用する。

v1.4ではBrewを単なる履歴ではなく、再現・比較できるレシピ実験ノートとして扱う。

## Main navigation

- Beans
- Cafe
- Insights
- Settingsは歯車アイコンから開く

## Brew Lab

- 過去Brewの抽出条件を複製する
- 抽出条件をテンプレートとして保存する
- 抽出方法をユーザーが管理する
- Brew Ratioを豆量・湯量から自動計算する
- 同じ豆のBrewを比較する
- 評価の最新値・最高値・平均値・前回比を表示する

## Rating axes

- 酸味
- 苦味
- 甘味
- コク
- 香り
- 総合評価
- リピート判定

## Storage

すべてのユーザーデータと写真は、利用端末のブラウザ内に保存する。IndexedDBを使用し、JSONバックアップから復元できるようにする。
