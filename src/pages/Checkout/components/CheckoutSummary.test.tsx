import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CheckoutSummary } from "./CheckoutSummary";

describe("ChecoutSummary", () => {
  it("title is right", () => {
    render(<CheckoutSummary discount={0} delivery={0} totalPrice={100} totalSummary={100} />);

    expect(screen.getByText("Підсумок замовлення")).toBeInTheDocument();
  });

  it("shown normal prices without delivery", () => {
    render(<CheckoutSummary discount={0} delivery={0} totalPrice={100} totalSummary={100} />);

    expect(screen.getByText("Ціна:")).toBeInTheDocument();
    expect(screen.getByText("100.00 грн")).toBeInTheDocument();
    expect(screen.getByText("Всього:")).toBeInTheDocument();
    expect(screen.getByText("100.00 грн")).toBeInTheDocument();
  });

  it("shows discount and delivery", () => {
    render(<CheckoutSummary discount={20} delivery={10} totalPrice={100} totalSummary={90} />);

    expect(screen.getByText("Знижка:")).toBeInTheDocument();
    expect(screen.getByText("-20.00 грн"));

    expect(screen.getByText("Доставка:")).toBeInTheDocument();
    expect(screen.getByText("10.00 грн")).toBeInTheDocument();

    expect(screen.getByText("Всього:")).toBeInTheDocument();
    expect(screen.getByText("90.00 грн")).toBeInTheDocument();
  });
});
