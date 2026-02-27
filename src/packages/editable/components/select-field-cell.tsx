import { useState, useEffect } from "react";
import type { CellContext, RowData } from "@tanstack/react-table";

/**
 * SelectFieldCell の Props 型定義
 * @template TData - データの型
 * @template TValue - 値の型
 */
export interface SelectFieldCellProps<
  TData extends RowData,
  TValue,
> extends CellContext<TData, TValue> {
  /** 選択肢の配列 */
  options: { label: string; value: string | number }[];
}

/**
 * ドロップダウンから値を選択してセルを編集するための SelectFieldCell コンポーネント
 * @template TData - データの型
 * @template TValue - 値の型
 * @param {SelectFieldCellProps<TData, TValue>} props - コンポーネントのプロパティ
 * @returns {JSX.Element} select 要素
 */
export const SelectFieldCell = <TData extends RowData, TValue>({
  getValue,
  cell,
  column,
  options,
}: SelectFieldCellProps<TData, TValue>) => {
  const initialValue = getValue() as string | number;
  const [value, setValue] = useState(initialValue);

  // 外部からのデータ変更（他所での更新など）に同期する
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  /**
   * 編集完了時の処理
   * 新しい値を更新し、編集モードを終了する
   * @param {string | number} newValue - 更新する値
   */
  const handleComplete = (newValue: string | number) => {
    cell.updateValue(newValue);
    cell.setIsEditing(false);
  };

  return (
    <select
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        handleComplete(newValue);
      }}
      onBlur={() => handleComplete(value)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          cell.setIsEditing(false);
        }
      }}
      autoFocus
      style={{ width: column.getSize(), padding: "0px" }}
      disabled={!cell.getIsEditing()}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
