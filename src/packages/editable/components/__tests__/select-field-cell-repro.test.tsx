/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SelectFieldCell } from "../select-field-cell.tsx";
import type { CellContext, Cell, Column } from "@tanstack/react-table";

/**
 * SelectFieldCell コンポーネントの不具合再現テスト
 */
describe("SelectFieldCell Bug Reproduction", () => {
  const options = [
    { label: "オプション1", value: "option1" },
    { label: "オプション2", value: "option2" },
  ];

  it("編集モードでない場合（getIsEditing() が false）でも、操作可能（disabled でない）であること", () => {
    // getIsEditing が false を返すようにモック化
    const mockCellContext = {
      getValue: () => "option1",
      cell: {
        updateValue: vi.fn(),
        setIsEditing: vi.fn(),
        getIsEditing: () => false, // 編集モードオフ
      } as unknown as Cell<any, any>,
      column: {
        getSize: () => 150,
      } as unknown as Column<any, any>,
      row: {} as any,
      table: {} as any,
    } as CellContext<any, any>;

    render(<SelectFieldCell {...mockCellContext} options={options} />);

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;

    // 現在の実装では disabled になっているため、このテストは失敗するはず
    expect(selectElement.disabled).toBe(false);
  });
});
