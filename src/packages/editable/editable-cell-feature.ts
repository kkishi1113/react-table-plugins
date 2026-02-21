/** version 0.0.3 */
import {
  type TableFeature,
  type Table,
  makeStateUpdater,
} from "@tanstack/react-table";

export const EditableCellFeature: TableFeature<any> = {
  getInitialState: (state): any => ({
    editingCell: null,
    ...state,
  }),

  getDefaultOptions: (table: Table<any>): any => ({
    onEditingCellChange: makeStateUpdater("editingCell", table),
  }),

  createCell: (cell, column, row, table): void => {
    cell.getIsEditing = () => {
      const editingCell = table.getState().editingCell;
      return (
        editingCell?.rowIndex === row.index &&
        editingCell?.columnId === column.id
      );
    };

    cell.setIsEditing = () => {
      table.options.onEditingCellChange?.({
        rowIndex: row.index,
        columnId: column.id,
      });
    };

    // cell.updateValue = (value: any) => {
    //   // Feature 経由で実データの更新処理を呼び出す
    //   table.options.updateData(row.index, column.id, value);
    // };
    cell.updateValue = (value: any) => {
      const rowIndex = row.index;
      const columnId = column.id;

      // ここでデータの更新ロジックをカプセル化！
      // 利用側は updateData の中身を書く必要がなくなる
      table.options.onEditingCellCommit((oldData) =>
        oldData.map((prevRow, index) => {
          if (index === rowIndex) {
            return {
              ...prevRow,
              [columnId]: value,
            };
          }
          return prevRow;
        }),
      );

      cell.setIsEditing(false);
    };
  },
};

/** version 0.0.2 */
// import {
//   type TableFeature,
//   type RowData,
//   type Table,
//   type OnChangeFn,
//   makeStateUpdater,
// } from "@tanstack/react-table";

// // 1. 型の拡張（Module Augmentation）
// // これにより、IDEの補完や型チェックが効くようになります
// declare module "@tanstack/react-table" {
//   // テーブル全体のステートに編集中のセル情報を追加
//   interface TableState {
//     editingCell: { rowIndex: number; columnId: string } | null;
//   }

//   // オプションに状態変更ハンドラーを追加
//   interface TableOptionsResolved<TData extends RowData> {
//     onEditingCellChange?: OnChangeFn<{
//       rowIndex: number;
//       columnId: string;
//     } | null>;
//   }

//   // 各セルインスタンスにメソッドを追加
//   interface Cell<TData extends RowData, TValue> {
//     getIsEditing: () => boolean;
//     setIsEditing: (editing: boolean) => void;
//   }
// }

// // 2. Feature オブジェクトの定義
// export const EditableCellFeature: TableFeature<any> = {
//   // 初期状態の定義
//   getInitialState: (state): any => {
//     return {
//       editingCell: null,
//       ...state,
//     };
//   },

//   // デフォルトオプションの定義
//   getDefaultOptions: (table: Table<any>): any => {
//     return {
//       onEditingCellChange: makeStateUpdater("editingCell", table),
//     };
//   },

//   // セルインスタンス生成時の拡張
//   createCell: (cell, column, row, table): void => {
//     // 現在のセルが編集モードかどうかを判定するメソッド
//     cell.getIsEditing = () => {
//       const editingCell = table.getState().editingCell;
//       return (
//         editingCell?.rowIndex === row.index &&
//         editingCell?.columnId === column.id
//       );
//     };

//     // 編集モードを切り替えるメソッド
//     cell.setIsEditing = (editing: boolean) => {
//       table.options.onEditingCellChange?.(
//         editing ? { rowIndex: row.index, columnId: column.id } : null,
//       );
//     };
//   },
// };

/** version 0.0.1 */
// import {
//   makeStateUpdater,
//   type RowData,
//   type Table,
//   type TableFeature,
// } from "@tanstack/react-table";
// import type {
//   EditableCellOptions,
//   EditableCellTableState,
// } from "./editable-cell.types";

// export const EditableCellFeature: TableFeature<any> = {
//   getInitialState: (state): EditableCellTableState => ({
//     editingCell: null,
//     editingValue: undefined,
//     ...state,
//   }),

//   getDefaultOptions: <TData extends RowData>(
//     table: Table<TData>,
//   ): EditableCellOptions => ({
//     enableEditing: true,
//     onEditingCellChange: makeStateUpdater("editingCell", table),
//     onEditingValueChange: makeStateUpdater("editingValue", table),
//   }),

//   createTable: <TData extends RowData>(table: Table<TData>) => {
//     table.startEditingCell = (rowId, columnId) => {
//       table.options.onEditingCellChange?.({ rowId, columnId });
//       table.options.onEditingValueChange?.(
//         table.getRow(rowId)?.getValue(columnId),
//       );
//     };

//     table.updateEditingValue = (value) => {
//       table.options.onEditingValueChange?.(value);
//     };

//     table.commitEditingCell = () => {
//       const cell = table.getState().editingCell;
//       if (!cell) return;

//       table.options.onCommitEditingCell?.(
//         cell,
//         table.getState().editingValue,
//         table,
//       );

//       table.options.onEditingCellChange?.(null);
//       table.options.onEditingValueChange?.(undefined);
//     };

//     table.cancelEditingCell = () => {
//       table.options.onEditingCellChange?.(null);
//       table.options.onEditingValueChange?.(undefined);
//     };

//     table.isEditingCell = (rowId, columnId) => {
//       const cell = table.getState().editingCell;
//       return cell?.rowId === rowId && cell?.columnId === columnId;
//     };
//   },
// };
