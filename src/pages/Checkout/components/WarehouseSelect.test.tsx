import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WarehouseSelect } from "./WarehouseSelect";
import type { RootState } from "../../../redux/store";

const mockDispatch = vi.fn();
const mockOnChange = vi.fn();

let currentState: RootState;

// Мокаємо модуль
vi.mock("../../../redux/reduxTypeHook", async () => {
  const actual: any = await vi.importActual("../../../redux/reduxTypeHook");
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: (selector: any) => selector(currentState),
  };
});

const fakeState: RootState = {
  auth: {} as any,
  cart: {} as any,
  products: {} as any,
  payment: {
    nova_adress: [{ description: "Відділення №1: вул. Волонтерів, 16", ref: "1ec09d2b-e1c2-11e3-8c4a-0050568002cf" }],
    loadingWarehouses: false,
    loading: false,
    error: null,
    liqpayData: null,
    cities: [],
  },
  order: {} as any,
  map: {} as any,
};

describe("WarehouseSelect", () => {
  it("call onChange('') after changing cityRef", () => {
    currentState = fakeState;
    render(<WarehouseSelect cityRef="kyiv123" value="some" onChange={mockOnChange} error="" />);
    expect(mockOnChange).toHaveBeenCalledWith("");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("show list warehouses after loading", () => {
    currentState = fakeState;
    render(<WarehouseSelect cityRef="kyiv123" value="" onChange={mockOnChange} error="" />);
    expect(screen.getByText("Відділення №1: вул. Волонтерів, 16")).toBeInTheDocument();
  });

  it("shows message when warehouses not found", () => {
    currentState = {
      ...fakeState,
      payment: { ...fakeState.payment, nova_adress: [] },
    };
    render(<WarehouseSelect cityRef="kyiv123" value="" onChange={mockOnChange} error="" />);
    expect(screen.getByText("Нажаль відділення для цього міста не знайдено. Спробуйте ввести інше місто.")).toBeInTheDocument();
  });

  it("shows loading message", () => {
    currentState = {
      ...fakeState,
      payment: { ...fakeState.payment, loadingWarehouses: true },
    };
    render(<WarehouseSelect cityRef="kyiv123" value="" onChange={mockOnChange} error="" />);

    expect(screen.getByText("Завантаження відділень...")).toBeInTheDocument();
  });

  it("shows error", () => {
    render(<WarehouseSelect cityRef="kyiv123" value="" onChange={mockOnChange} error="Обов'язкове поле" />);

    expect(screen.getByText("Обов'язкове поле")).toBeInTheDocument();
  });

  it("calls fetchWerhouses when cityRef changes", () => {
    render(<WarehouseSelect cityRef="1" value="" onChange={mockOnChange} error="" />);
    expect(mockDispatch).toHaveBeenCalled(); // dispatch викликаний
  });
});
