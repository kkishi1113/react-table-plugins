// import { type Cell, type RowData, type Table } from "@tanstack/react-table";

import { type ColumnDef } from "@tanstack/react-table";
import React from "react";

// export const cell = <TData extends RowData, TValue>({
//   cell,
//   table,
// }: {
//   cell: Cell<TData, TValue>;
//   table: Table<TData>;
// }) => {
//   const isEditing = table.isEditingCell(cell.row.id, cell.column.id);

//   if (isEditing) {
//     return (
//       <input
//         autoFocus
//         defaultValue={cell.getValue() as string}
//         onChange={(e) =>
//           table.updateEditingValue(cell.row.id, cell.column.id, e.target.value)
//         }
//         onBlur={() => table.commitEditingCell()}
//       />
//     );
//   }

//   return (
//     <div
//       onDoubleClick={() => table.startEditingCell(cell.row.id, cell.column.id)}
//     >
//       {String(cell.getValue())}
//     </div>
//   );
// };

/** */
export const defaultColumn: Partial<ColumnDef<any, any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      //   table.options.meta?.updateData(index, id, value);
      table.updateEditingValue(value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

/** */
// export const defaultColumn: Partial<ColumnDef<any, any>> = {
//   cell: ({ cell, table }) => {
//     const isEditing = table.isEditingCell(cell.row.id, cell.column.id);

//     if (isEditing) {
//       return (
//         <input
//           autoFocus
//           value={String(table.getState().editingValue ?? "")}
//           onChange={(e) => table.updateEditingValue(e.target.value)}
//           onBlur={() => table.commitEditingCell()}
//         />
//       );
//     }

//     return (
//       <div
//         onDoubleClick={() =>
//           table.startEditingCell(cell.row.id, cell.column.id)
//         }
//       >
//         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//       </div>
//     );
//   },
// };
