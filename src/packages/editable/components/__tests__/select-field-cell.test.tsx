/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { SelectFieldCell } from "../select-field-cell.tsx";
import type { CellContext, Cell, Column } from "@tanstack/react-table";

/**
 * SelectFieldCell コンポーネントのテスト
 */
describe("SelectFieldCell", () => {
  const mockUpdateValue = vi.fn();
  const mockSetIsEditing = vi.fn();

  // CellContextのモック
  // 最低限必要なプロパティのみをモック化しています
  const mockCellContext = {
    getValue: () => "option2",
    cell: {
      updateValue: mockUpdateValue,
      setIsEditing: mockSetIsEditing,
      getIsEditing: () => true,
    } as unknown as Cell<any, any>,
    column: {
      getSize: () => 150,
    } as unknown as Column<any, any>,
    row: {} as any,
    table: {} as any,
  } as CellContext<any, any>;

  const options = [
    { label: "オプション1", value: "option1" },
    { label: "オプション2", value: "option2" },
    { label: "オプション3", value: "option3" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("optionsで渡された選択肢がoption要素として正しくレンダリングされること", () => {
    render(<SelectFieldCell {...mockCellContext} options={options} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeDefined();

    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(3);

    expect(optionElements[0].textContent).toBe("オプション1");
    expect((optionElements[0] as HTMLOptionElement).value).toBe("option1");
  });

  it("セルの初期値（getValue()）が正しく選択された状態になること", () => {
    render(<SelectFieldCell {...mockCellContext} options={options} />);

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe("option2");
  });

  it("選択肢を変更した際に、cell.updateValueが新しい値で呼ばれ、編集モードが終了すること", () => {
    render(<SelectFieldCell {...mockCellContext} options={options} />);

    const selectElement = screen.getByRole("combobox");

    // 値を 'option3' に変更する
    fireEvent.change(selectElement, { target: { value: "option3" } });

    expect(mockUpdateValue).toHaveBeenCalledWith("option3");
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  it("select要素からフォーカスが外れた際（onBlur）に、編集モードが終了すること", () => {
    render(<SelectFieldCell {...mockCellContext} options={options} />);

    const selectElement = screen.getByRole("combobox");

    // フォーカスを外す
    fireEvent.blur(selectElement);

    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  it("編集モードでない場合（getIsEditing() が false）でも、要素が有効（disabled でない）であること", () => {
    const inactiveContext = {
      ...mockCellContext,
      cell: {
        ...mockCellContext.cell,
        getIsEditing: () => false,
      },
    } as any;

    render(<SelectFieldCell {...inactiveContext} options={options} />);

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.disabled).toBe(false);
  });

  it("フォーカスを得た際に、cell.setIsEditing(true) が呼ばれること", () => {
    render(<SelectFieldCell {...mockCellContext} options={options} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);

    expect(mockSetIsEditing).toHaveBeenCalledWith(true);
  });
});
