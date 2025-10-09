import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer, * as authThunks from "../../redux/slices/authSlice";
import AuthForm from "./AuthForm";

vi.spyOn(authThunks, "loginUser").mockImplementation((data: any) => {
  const thunkAction: any = async (dispatch: any) => {
    dispatch({ type: "auth/login/pending" });

    await new Promise((r) => setTimeout(r, 50));

    const result = {
      type: "auth/login/fulfilled",
      payload: { user: { uid: "123", email: data.email, role: "user" } },
    };

    dispatch(result);
    return result;
  };

  thunkAction.rejected = { match: (res: any) => res?.type === "auth/login/rejected" };
  return thunkAction as any;
});

vi.spyOn(authThunks, "registerUser").mockImplementation((data: any) => {
  const thunkAction: any = async (dispatch: any) => {
    dispatch({ type: "auth/register/pending" });

    await new Promise((r) => setTimeout(r, 50));

    const result = {
      type: "auth/register/fulfilled",
      payload: { user: { uid: "456", email: data.email, role: "user" } },
    };

    dispatch(result);
    return result;
  };

  thunkAction.rejected = { match: (res: any) => res?.type === "auth/register/rejected" };
  return thunkAction as any;
});

const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: { auth: { user: null, loading: false, error: null } },
});

describe("AuthForm component", () => {
  it("dispatches loginUser action on valid password", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AuthForm mode="login" title="Тест логіну" />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/Email/i), "test@example.com");
    await user.type(screen.getByPlaceholderText(/Password/i), "Bві626#sda1!aaaa");

    const submitButton = await screen.findByRole("button", { name: "Увійти" });
    await user.click(submitButton);

    expect(await screen.findByRole("button", { name: "Завантаження..." })).toBeInTheDocument();
  });

  it("dispatches register user and shows loading", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <AuthForm mode="register" title="Тест реєстрації" />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/Email/i), "newuser@example.com");
    await user.type(screen.getByPlaceholderText(/Password/i), "Aa1!abcd");

    const submitButton = screen.getByRole("button", { name: "Зареєструватися" });
    await user.click(submitButton);

    const loadingButton = await screen.findByRole("button", { name: "Завантаження..." });
    expect(loadingButton).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 10));
    expect(loadingButton).toBeDisabled();

    await screen.findByRole("button", { name: "Зареєструватися" });
    expect(screen.getByPlaceholderText(/Email/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/Password/i)).toHaveValue("");
  });

  it("shows error when email is already taken", async () => {
    const user = userEvent.setup();

    vi.spyOn(authThunks, "registerUser").mockImplementation(() => {
      const thunk: any = async (dispatch: any) => {
        dispatch({ type: "auth/register/pending" });
        await new Promise((r) => setTimeout(r, 50));
        const result = {
          type: "auth/register/rejected",
          payload: "Email вже використовується",
        };
        dispatch(result);
        return result;
      };
      thunk.rejected = { match: (res: any) => res?.type === "auth/register/rejected" };
      return thunk as any;
    });

    render(
      <Provider store={store}>
        <AuthForm mode="register" title="Тест реєстрації" />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/Email/i), "existing@example.com");
    await user.type(screen.getByPlaceholderText(/Password/i), "Aa1!abcd");
    await user.click(screen.getByRole("button", { name: /Зареєструватися/i }));

    await screen.findByText((content) => content.includes("Email вже використовується"));
  });

  it("shows error for invalid password", async () => {
    const user = userEvent.setup();
    const registerSpy = vi.spyOn(authThunks, "registerUser");

    render(
      <Provider store={store}>
        <AuthForm mode="register" title="Тест реєстрації" />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/Email/i), "test@exemple.com");
    await user.type(screen.getByPlaceholderText(/Password/i), "short");

    await user.click(screen.getByRole("button", { name: /Зареєструватися/i }));

    expect(await screen.findByText(/Пароль має містити мінімум 8 символів/)).toBeInTheDocument();

    expect(registerSpy).not.toHaveBeenCalled();
  });
});
