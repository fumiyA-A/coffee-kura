# Coffee Kura v1.3

## v1.3
- Bean / Brew / Cafeの日付をiPhone標準カレンダーで入力
- 表示はYYYY/MM/DD、内部保存はYYYY-MM-DD
- 未保存フォームから戻る際の確認
- 必須項目・負数・ブレンド産地数の入力検証
- 登録済みロースターの再利用
- 登録済みカフェ選択時の場所自動補完
- 写真の表紙選択、最大枚数警告、個別削除、圧縮
- Brew編集・削除
- Bean削除時に紐づくBrewも一括削除
- 保存完了トースト
- バックアップ最終日時、記録件数、写真枚数、概算容量
- 旧データを新形式へ自動移行
- GitHub Actionsは公開npmレジストリを明示

## Build
```bash
npm install --registry=https://registry.npmjs.org/ --no-audit --no-fund
npm run build
```
