import { KuraCard } from "../components/ui/KuraCard";

export function SettingsPage() {
  return (
    <div className="space-y-5">
      <KuraCard>
        <h2 className="font-serif text-xl text-[#f5efe7]">この端末のデータ</h2>
        <p className="mt-3 leading-7 text-[#aaa198]">
          Coffee Kuraの記録は、このiPhoneのブラウザ内に保存されます。
        </p>
      </KuraCard>

      <KuraCard>
        <h2 className="font-serif text-xl text-[#f5efe7]">今後追加する機能</h2>
        <ul className="mt-3 space-y-2 text-[#aaa198]">
          <li>・バックアップを書き出す</li>
          <li>・バックアップを読み込む</li>
          <li>・すべてのデータを削除する</li>
        </ul>
      </KuraCard>
    </div>
  );
}
