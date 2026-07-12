# Coffee Kura Data Model

## Bean

豆そのものの情報。Bean 1件に対してBrewが複数件紐づく。

## Brew

自宅で淹れた一杯。`beanId`でBeanと関連づける。日付、抽出方法、豆量、湯量、湯温、抽出時間、挽き目、評価を保持する。

Brew Ratioは保存せず、`waterAmount / beanAmount`から表示時に計算する。

## BrewRecipeTemplate

日付・写真・評価を含まない再利用可能な抽出条件。Brewフォームへ適用でき、過去のBrewからも作成できる。

## BrewMethodDefinition

抽出方法の表示名と順序を管理する。標準項目に加えて、ユーザーが任意の器具・抽出方法を追加できる。

## CafeCup

カフェで飲んだ一杯。Bean/Brewとは独立して記録する。

## Storage

IndexedDB database version 4。v1.4で以下のstoreを追加した。

- `brew-methods`
- `brew-recipe-templates`
