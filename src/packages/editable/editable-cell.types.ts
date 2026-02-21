/** version 0.0.2 */
import { type RowData, type OnChangeFn } from "@tanstack/react-table";

/**
 * 現在編集中のセルを特定するための型
 */
export type EditingCell = {
  rowIndex: number;
  columnId: string;
};

/**
 * TanStack Table の内部型を拡張
 */
declare module "@tanstack/react-table" {
  // 1. テーブル全体のステート (table.getState())
  interface TableState {
    editingCell: EditingCell | null;
  }

  // 2. テーブルのオプション (useReactTable({ ... }))
  // TData extends RowData を指定することで型安全性を確保
  interface TableOptionsResolved<TData extends RowData> {
    /** 編集状態が変更されたときに呼ばれるハンドラー */
    onEditingCellChange?: OnChangeFn<EditingCell | null>;
    /** 実際のデータソースを更新するための関数 */
    // updateData: (rowIndex: number, columnId: string, value: any) => void;
    onEditingCellCommit: (updater: (old: TData[]) => TData[]) => void;
  }

  // 3. セルインスタンスのメソッド (cell.getIsEditing() など)
  interface Cell<TData extends RowData, TValue> {
    /** このセルが現在編集モードかどうかを返す */
    getIsEditing: () => boolean;
    /** このセルの編集モードを切り替える */
    setIsEditing: (isEditing: boolean) => void;
    /** このセルの値を更新し、編集モードを終了する */
    updateValue: (value: any) => void;
  }

  // (任意) カラム定義の拡張：特定のカラムを編集不可にしたい場合など
  interface ColumnMeta<TData extends RowData, TValue> {
    disableEditing?: boolean;
  }
}

/** version 0.0.1 */
// import type { OnChangeFn, RowData, Table } from "@tanstack/react-table";

// declare module "@tanstack/react-table" {
//   interface TableState extends EditableCellTableState {}

//   interface TableOptionsResolved<
//     TData extends RowData,
//   > extends EditableCellOptions {}

//   interface Table<TData extends RowData> extends EditableCellInstance {}
// }

// export interface EditingCell {
//   rowId: string;
//   columnId: string;
// }

// export interface EditableCellTableState {
//   editingCell: EditingCell | null;
//   editingValue: unknown;
// }

// export interface EditableCellOptions {
//   enableEditing?: boolean;
//   onEditingCellChange?: OnChangeFn<EditingCell | null>;
//   onEditingValueChange?: OnChangeFn<unknown>;
//   onCommitEditingCell?: (
//     cell: EditingCell,
//     value: unknown,
//     table: Table<any>,
//   ) => void;
// }

// export interface EditableCellInstance {
//   startEditingCell: (rowId: string, columnId: string) => void;
//   updateEditingValue: (value: unknown) => void;
//   commitEditingCell: () => void;
//   cancelEditingCell: () => void;
//   isEditingCell: (rowId: string, columnId: string) => boolean;
// }
