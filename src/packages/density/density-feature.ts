import {
  type TableFeature,
  type Table,
  type RowData,
  makeStateUpdater,
  type Updater,
  functionalUpdate,
} from "@tanstack/react-table";
import type {
  DensityOptions,
  DensityState,
  DensityTableState,
} from "./density.types";

// export const densityFeature = (options?: DensityOptions): TableFeature<any> => {
//   return {
//     // feature 名（デバッグ用）
//     featureName: "density",

//     // table 初期化時に meta を補完
//     getDefaultOptions: (table) => {
//       return {
//         meta: {
//           density:
//             table.options.meta?.density ?? options?.defaultDensity ?? "middle",
//         },
//       };
//     },

//     // table インスタンスに API を生やす
//     createTable: (table: Table<any>) => {
//       return {
//         setDensity: (density: Density) => {
//           table.setOptions((prev) => ({
//             ...prev,
//             meta: {
//               ...prev.meta,
//               density,
//             },
//           }));
//         },

//         getDensity: (): Density => {
//           return (
//             table.options.meta?.density ?? options?.defaultDensity ?? "middle"
//           );
//         },
//       };
//     },
//   };
// };

export const DensityFeature: TableFeature<any> = {
  // 初期状態を定義する
  getInitialState: (state): DensityTableState => {
    return {
      density: "md",
      ...state,
    };
  },

  // デフォルトオプションを定義する
  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>,
  ): DensityOptions => {
    return {
      enableDensity: true,
      onDensityChange: makeStateUpdater("density", table),
    } as DensityOptions;
  },
  // 列のデフォルト定義を追加する
  // getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
  //   return { meta: {} } //use meta instead of directly adding to the columnDef to avoid typescript stuff that's hard to workaround
  // },

  // テーブルインスタンスに API を生やす
  createTable: <TData extends RowData>(table: Table<TData>): void => {
    table.setDensity = (updater) => {
      const safeUpdater: Updater<DensityState> = (old) => {
        let newState = functionalUpdate(updater, old);
        return newState;
      };
      return table.options.onDensityChange?.(safeUpdater);
    };
    table.toggleDensity = (value) => {
      table.setDensity((old) => {
        if (value) return value;
        return old === "lg" ? "md" : old === "md" ? "sm" : "lg"; //cycle through the 3 options
      });
    };
  },

  // 行インスタンスに API を生やす
  // createRow: <TData extends RowData>(row, table): void => {},
  // セルインスタンスに API を生やす
  // createCell: <TData extends RowData>(cell, column, row, table): void => {},
  // 列インスタンスに API を生やす
  // createColumn: <TData extends RowData>(column, table): void => {},
  // ヘッダーインスタンスに API を生やす
  // createHeader: <TData extends RowData>(header, table): void => {},
};
