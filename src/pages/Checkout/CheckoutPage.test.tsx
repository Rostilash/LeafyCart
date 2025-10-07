import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import orderReducer from "../../redux/slices/orderSlice";
import cartReducer from "../../redux/slices/cartSlice";
import authReducer from "../../redux/slices/authSlice";
import { CheckoutPage } from "./CheckoutPage";

// Тестовий initial state
const initialState = {
  auth: {
    user: { uid: "123", email: "124@com.ua", role: "user" },
    loading: false,
    error: null,
  },
  order: {
    user_orders: [],
    all_orders: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  cart: {
    items: [{ id: "1", name: "Test Item", price: 1000, quantity: 1, img: "test.jpg" }],
    loading: false,
    error: null,
  },
};

// --------------------Moc components-----------------
vi.mock("./components/CheckoutForm", () => ({
  CheckoutForm: (props: any) => (
    <form data-testid="checkout-form">
      <input name="name" value={props.formData.name} onChange={() => {}} />
      <button type="submit">Оплатити</button>
    </form>
  ),
}));
vi.mock("./components/CityInput", () => ({ CityInput: () => <div data-testid="city-input" /> }));
vi.mock("./components/WarehouseSelect", () => ({ WarehouseSelect: () => <div data-testid="warehouse-select" /> }));
vi.mock("../../components/AuthComponents/AuthPage", () => ({ AuthPage: () => <div data-testid="auth-page" /> }));
vi.mock("../../../components/Loader", () => ({ Loader: () => <div data-testid="loader" /> }));

// Функція для створення store для тесту
function makeStore(state = initialState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      order: orderReducer,
      cart: cartReducer,
    },
    preloadedState: {
      auth: state.auth,
      order: state.order,
      cart: state.cart,
    },
  });
}

vi.mock("./components/CheckoutSummary", () => ({
  CheckoutSummary: () => <div data-testid="checkout-summary">Сума замовлення: MOCK</div>,
}));

describe("CheckoutPage", () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore(initialState);
  });

  it("renders CheckoutForm and CheckoutSummary", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CheckoutPage totalPrice={1000} totalDiscount={100} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("checkout-form")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Сума замовлення"))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Оплатити/i })).toBeInTheDocument();
  });
});
