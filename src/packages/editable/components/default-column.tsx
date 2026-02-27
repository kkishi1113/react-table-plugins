import { useState, useEffect } from "react";
import { type ColumnDef } from "@tanstack/react-table";

export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, column, cell }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    // 外部からのデータ変更（他所での更新など）に同期
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
      cell.updateValue(value);
      cell.setIsEditing(false);
    };

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") onBlur();
          if (e.key === "Escape") cell.setIsEditing(false);
        }}
        onFocus={() => cell.setIsEditing(true)}
        autoFocus={cell.getIsEditing()}
        style={{ width: column.getSize(), padding: "0px" }}
      />
    );

    // return (
    //   <div
    //     onClick={() => cell.setIsEditing(true)}
    //     style={{
    //       cursor: "pointer",
    //       minHeight: "1.5em",
    //       width: column.getSize(),
    //     }}
    //   >
    //     {value as string}
    //   </div>
    // );
  },
};
