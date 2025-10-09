import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import checkoutReducer from "../../../redux/slices/checkoutSlice";
import { CityInput } from "./CityInput";
import { Provider } from "react-redux";
import { useState } from "react";

const renderWithState = (ui: (state: { city: string }, setState: (val: string) => void) => React.ReactElement, initialState = "") => {
  const store = configureStore({ reducer: { checkout: checkoutReducer } });
  let state = initialState;

  const Wrapper = () => {
    const [city, setCity] = useState(state);
    return ui({ city }, setCity);
  };

  return render(
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};
const mockOnSelect = vi.fn();
const onChange = vi.fn();

describe("CityInput", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: [{ Description: "Ужгород", Ref: "e221d627-391c-11dd-90d9-001a925" }],
        }),
    }) as any;
  });

  it("shows tooltips and calls onSelect when a city is selected", async () => {
    renderWithState(({ city }, setCity) => <CityInput value={city} error="" сityRef="" debounceMs={0} onChange={setCity} onSelect={mockOnSelect} />);

    const input = screen.getByPlaceholderText("Введіть місто");
    await userEvent.type(input, "Уж");

    const option = await screen.findByText("Ужгород", {}, { timeout: 2000 });
    expect(option).toBeInTheDocument();

    await userEvent.click(option);

    expect(mockOnSelect).toHaveBeenCalledWith({
      description: "Ужгород",
      ref: "e221d627-391c-11dd-90d9-001a925",
    });
  });

  it("shows an error if error is passed", () => {
    renderWithState(({ city }, setCity) => (
      <CityInput value={city} error="Обов'язкове поле" сityRef="" debounceMs={0} onChange={setCity} onSelect={mockOnSelect} />
    ));

    expect(screen.getByText("Обов'язкове поле")).toBeInTheDocument();
  });

  it("calls onChange on input", async () => {
    renderWithState(({ city }, setCity) => (
      <CityInput
        value={city}
        error=""
        сityRef=""
        debounceMs={0}
        onChange={(val) => {
          setCity(val);
          onChange(val);
        }}
        onSelect={mockOnSelect}
      />
    ));

    const input = screen.getByPlaceholderText("Введіть місто");
    await userEvent.type(input, "Льв");
    expect(onChange).toHaveBeenCalledWith("Л");
    expect(onChange).toHaveBeenCalledWith("Ль");
    expect(onChange).toHaveBeenCalledWith("Льв");
  });

  it("does not show tooltip if selected is already selected", async () => {
    renderWithState((_, setCity) => <CityInput value="Київ" error="" сityRef="kyiv123" debounceMs={0} onChange={setCity} onSelect={mockOnSelect} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("отримує дані з fetch", async () => {
    renderWithState(({ city }, setCity) => <CityInput value={city} error="" сityRef="" debounceMs={0} onChange={setCity} onSelect={mockOnSelect} />);

    const input = screen.getByPlaceholderText("Введіть місто");
    await userEvent.type(input, "Уж");

    const option = await screen.findByText("Ужгород");
    expect(option).toBeInTheDocument();

    // Сheck how many fethces
    expect(global.fetch).toHaveBeenCalledTimes(2);

    // Check parameters in fetch call
    expect(global.fetch).toHaveBeenCalledWith("/api/np", expect.any(Object));
  });
});
