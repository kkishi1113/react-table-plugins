import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import React from "react";
import {
  DensityFeature,
  // EditableCellFeature,
  type DensityState,
} from "../packages";
import { makeData, type Person } from "./makeData";
import { defaultColumn } from "../packages/editable/components/default-column";
import { EditableCellFeature } from "../packages/editable/editable-cell-feature";
import type { EditingCell } from "../packages/editable/editable-cell.types";
// import { defaultColumn } from "./components/cell";

export function DataTable() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
      },
    ],
    [],
  );

  const [data, setData] = React.useState(() => makeData(100));
  const [density, setDensity] = React.useState<DensityState>("md");
  // const [editingCell, setEditingCell] = React.useState<EditingCell | null>(
  //   null,
  // );
  // const [editingValue, setEditingValue] = React.useState<unknown>(null);
  const [editingCell, setEditingCell] = React.useState<EditingCell | null>(
    null,
  );

  const table = useReactTable({
    _features: [DensityFeature, EditableCellFeature], // 自作の機能をテーブルに生成する
    columns,
    data,
    defaultColumn,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      density, // テーブルに密度状態を渡す
      // editingCell,
      // editingValue,
      editingCell,
    },
    onDensityChange: setDensity,
    // onEditingCellChange: setEditingCell,
    // onEditingValueChange: setEditingValue,
    // onCommitEditingCell: (cell, value) => {
    //   //   setData((old) =>
    //   //     old.map((row, i) =>
    //   //       row.id === cell.rowId ? { ...row, [cell.columnId]: value } : row,
    //   //     ),
    //   //   );
    // },
    onEditingCellChange: setEditingCell,
    onEditingCellCommit: setData,
    // updateData: (rowIndex, columnId, value) => {
    //   setData((old) =>
    //     old.map((row, index) => {
    //       if (index === rowIndex) {
    //         return { ...old[rowIndex]!, [columnId]: value };
    //       }
    //       return row;
    //     }),
    //   );
    // },
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <button
        onClick={() => table.toggleDensity()}
        className="border rounded p-1 bg-blue-500 text-white mb-2 w-64"
      >
        Toggle Density
      </button>
      <button
        onClick={() => console.log(table.getCoreRowModel().rows)}
        className="border rounded p-1 bg-blue-500 text-white mb-2 w-64"
      >
        Show Data
      </button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="outline outline-gray-200"
                    style={{
                      // 自作の機能を使用する
                      padding:
                        table.getState().density === "sm"
                          ? "4px"
                          : table.getState().density === "md"
                            ? "8px"
                            : "16px",
                      transition: "padding 0.2s",
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="outline outline-gray-200"
                      style={{
                        //using our new feature
                        padding:
                          density === "sm"
                            ? "4px"
                            : density === "md"
                              ? "8px"
                              : "16px",
                        transition: "padding 0.2s",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {table.getRowCount().toLocaleString()} Rows
      </div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
    </div>
  );
}
