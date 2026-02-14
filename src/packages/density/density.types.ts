import type { OnChangeFn, RowData, Updater } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableState extends DensityTableState {}
  interface TableOptionsResolved<
    TData extends RowData,
  > extends DensityOptions {}
  interface Table<TData extends RowData> extends DensityInstance {}
  // if you need to add cell instance APIs...
  // interface Cell<TData extends RowData, TValue> extends DensityCell
  // if you need to add row instance APIs...
  // interface Row<TData extends RowData> extends DensityRow
  // if you need to add column instance APIs...
  // interface Column<TData extends RowData, TValue> extends DensityColumn
  // if you need to add header instance APIs...
  // interface Header<TData extends RowData, TValue> extends DensityHeader

  // ノート：`ColumnDef`は型なのでインターフェースではありません。
  // しかし、それでも`ColumnDef.meta`で宣言マージングを使用できます。
}

export type DensityState = "sm" | "md" | "lg";

export interface DensityTableState {
  density?: DensityState;
}

export interface DensityOptions {
  enableDensity?: boolean;
  onDensityChange?: OnChangeFn<DensityState>;
}

export interface DensityInstance {
  setDensity: (updater: Updater<DensityState>) => void;
  toggleDensity: (value?: DensityState) => void;
}
