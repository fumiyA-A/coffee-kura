let dirty = false;

export function setFormDirty(value: boolean) {
  dirty = value;
}

export function confirmDiscardChanges(): boolean {
  if (!dirty) return true;
  return window.confirm("入力内容が保存されていません。破棄して移動しますか？");
}

export function clearFormDirty() {
  dirty = false;
}
