/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { defaultColumn } from "../default-column.tsx";
import type { CellContext, Cell, Column } from "@tanstack/react-table";

describe("defaultColumn", () => {
  it("編集モードの際（getIsEditing() が true）に、input が操作可能（disabled でない）であること", () => {
    const mockCellContext = {
      getValue: () => "test value",
      cell: {
        updateValue: vi.fn(),
        setIsEditing: vi.fn(),
        getIsEditing: () => true, // 編集モードオン
      } as unknown as Cell<any, any>,
      column: {
        getSize: () => 150,
      } as unknown as Column<any, any>,
      row: {} as any,
      table: {} as any,
    } as CellContext<any, any>;

    const Cell = defaultColumn.cell as React.FC<CellContext<any, any>>;
    render(<Cell {...mockCellContext} />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;

    // 現状の実装では disabled={cell.getIsEditing()} なので、true の時に disabled になり、ここで失敗するはず
    expect(inputElement.disabled).toBe(false);
  });
});
