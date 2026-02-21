import { DataTable } from "./data-table";
// import type { RowData } from "@tanstack/react-table";
// import type {
//   EditableCellOptions,
//   EditableCellInstance,
//   EditableCellTableState,
// } from "../packages/editable";

// declare module "@tanstack/react-table" {
//   interface TableState extends EditableCellTableState {}

//   interface TableOptionsResolved<
//     TData extends RowData,
//   > extends EditableCellOptions {}

//   interface Table<TData extends RowData> extends EditableCellInstance {}
// }

function App() {
  return (
    <>
      <DataTable />
    </>
  );
}

export default App;
