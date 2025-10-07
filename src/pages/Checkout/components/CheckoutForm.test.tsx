import { useState } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CheckoutForm } from "./CheckoutForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "../../../redux/slices/orderSlice";

// -----------------Moc hooks-----------------
vi.mock("../../../redux/reduxTypeHook", () => {
  return {
    useAppSelector: vi.fn().mockImplementation(() => ({ loading: false })),
    useAppDispatch: vi.fn().mockImplementation(() => () => Promise.resolve()),
  };
});

const mockErrors = {};
const mockSetFormData = vi.fn();
const mockHandleChange = vi.fn();
const mockHandleLiqPay = vi.fn();

// --------------------Moc components-----------------
vi.mock("./CityInput", () => ({ CityInput: () => <div data-testid="city-input" /> }));
vi.mock("./WarehouseSelect", () => ({ WarehouseSelect: () => <div data-testid="warehouse-select" /> }));
vi.mock("../../../components/Loader", () => ({ Loader: () => <div data-testid="loader" /> }));

// -----------------Initial state-----------------
const mockFormData = {
  name: "",
  last_name: "",
  mid_name: "",
  phone_number: "",
  email: "",
  city: "",
  cityRef: "",
  warehouse: "",
  payment: "cod",
};

// ---------------Taking the right reducer-----------------
const store = configureStore({
  reducer: {
    order: checkoutReducer,
  },
});

// -----------------Custum hooks for tests-----------------
const useWraperRender = (initialPayment = "cod") => {
  const Wrapper = () => {
    const [formData, setFormData] = useState({ ...mockFormData, payment: initialPayment });
    return (
      <CheckoutForm
        handleLiqPay={mockHandleLiqPay}
        setFormData={setFormData}
        handleChange={(e) => setFormData({ ...formData, payment: e.target.value })}
        formData={formData}
        hasCartItems={true}
        errors={mockErrors}
      />
    );
  };

  render(
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};

const useProviderCheckoutForm = (overrideProps: Partial<React.ComponentProps<typeof CheckoutForm>> = {}) => {
  const props = {
    handleLiqPay: mockHandleLiqPay,
    setFormData: mockSetFormData,
    handleChange: mockHandleChange,
    formData: mockFormData,
    hasCartItems: true,
    errors: mockErrors,
    ...overrideProps,
  };
  return render(
    <Provider store={store}>
      <CheckoutForm {...props} />
    </Provider>
  );
};

describe("CheckoutForm:", () => {
  it("changes checked state when clicking on LiqPay", async () => {
    useWraperRender();

    const codRadio = screen.getByRole("radio", { name: /У віділенні/i });
    const liqpayRadio = screen.getByRole("radio", { name: /LiqPay/i });

    // Initially - "У відділенні" selected
    expect(codRadio).toBeChecked();
    expect(liqpayRadio).not.toBeChecked();

    // Click on LiqPay
    await userEvent.click(liqpayRadio);

    // We expect the status to be updated.
    expect(liqpayRadio).toBeChecked();
    expect(codRadio).not.toBeChecked();
  });

  it("disables submit button when there are no cart items", () => {
    useProviderCheckoutForm({ hasCartItems: false });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls handleLiqPay on form submit", () => {
    useProviderCheckoutForm();

    const form = screen.getByTestId("checkout-form");
    fireEvent.submit(form);

    expect(mockHandleLiqPay).toHaveBeenCalled();
  });

  it("renders CityInput and WarehouseSelect", () => {
    useProviderCheckoutForm();

    expect(screen.getByTestId("city-input")).toBeInTheDocument();
    expect(screen.getByTestId("warehouse-select")).toBeInTheDocument();
  });

  it("calls handleChange when typing in a fields", async () => {
    useProviderCheckoutForm();

    const nameInput = screen.getByPlaceholderText("Ім’я...");
    await userEvent.type(nameInput, "Іван");
    expect(mockHandleChange).toHaveBeenCalled();

    const lastNameInput = screen.getByPlaceholderText("Призвіще...");
    await userEvent.type(lastNameInput, "Куранов");
    expect(mockHandleChange).toHaveBeenCalled();

    const midNameInput = screen.getByPlaceholderText("По батькові...");
    await userEvent.type(midNameInput, "Василій");
    expect(mockHandleChange).toHaveBeenCalled();

    const phoneInput = screen.getByPlaceholderText("Номер телефону...");
    await userEvent.type(phoneInput, "1241244");
    expect(mockHandleChange).toHaveBeenCalled();

    const emailInput = screen.getByPlaceholderText("Email...");
    await userEvent.type(emailInput, "test@com.ua");
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("shows correct button text depending on payment method", async () => {
    useWraperRender();
    expect(screen.getByRole("button")).toHaveTextContent("Оплатити у віділенні");

    const liqpayRadio = screen.getByRole("radio", { name: /liqpay/i });
    await userEvent.click(liqpayRadio);

    expect(screen.getByRole("button")).toHaveTextContent("Оплатити через LiqPay");
  });

  it("renders error message when errors are provided", () => {
    useProviderCheckoutForm({ errors: { name: "Обов’язкове поле" } });

    expect(screen.getByText("Обов’язкове поле")).toBeInTheDocument();
  });
});
