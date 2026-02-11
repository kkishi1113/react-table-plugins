import { DataTable } from "./data-table";
import type { RowData } from "@tanstack/react-table";
import type {
  DensityTableState,
  DensityOptions,
  DensityInstance,
} from "../packages/density";

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

function App() {
  return (
    <>
      <DataTable />
    </>
  );
}

export default App;
