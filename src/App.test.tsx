import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { IForm } from "./interfaces/interfaces";
import {
  deliveryFee,
  feeFromCartSurcharge,
  feeFromDistance,
  feeFromItemAmount,
  finalFee,
  isOnFridayRushhour,
} from "./helpers/calculator";

test("renders 'Calculate delivery price' button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Calculate delivery price/i);
  expect(linkElement).toBeInTheDocument();
});

describe("calculates various fees", () => {
  const state: IForm = {
    cartValue: 8.9,
    deliveryDistance: 1499,
    itemAmount: 4,
    date: "2021-10-22",
    time: "18:59",
  };

  const state1: IForm = {
    cartValue: 10,
    deliveryDistance: 1500,
    itemAmount: 5,
    date: "2021-10-21",
    time: "18:59",
  };

  const state2: IForm = {
    cartValue: 20,
    deliveryDistance: 1501,
    itemAmount: 10,
    date: "2021-10-22",
    time: "19:59",
  };

  const state3: IForm = {
    cartValue: 8.9,
    deliveryDistance: 19000,
    itemAmount: 5,
    date: "2021-10-21",
    time: "18:59",
  };

  it("calculates is on friday and rush hour", () => {
    expect(isOnFridayRushhour(state)).toBe(true);
    expect(isOnFridayRushhour(state1)).toBe(false);
    expect(isOnFridayRushhour(state2)).toBe(false);
  });

  it("calculates fee from cart surcharge", () => {
    expect(feeFromCartSurcharge(state)).toBe(1.1);
    expect(feeFromCartSurcharge(state1)).toBe(0);
    expect(feeFromCartSurcharge(state2)).toBe(0);
  });

  it("calculates fee from distance", () => {
    expect(feeFromDistance(state)).toBe(3);
    expect(feeFromDistance(state1)).toBe(3);
    expect(feeFromDistance(state2)).toBe(4);
  });

  it("calculates fee from item amount", () => {
    expect(feeFromItemAmount(state)).toBe(0);
    expect(feeFromItemAmount(state1)).toBe(0.5);
    expect(feeFromItemAmount(state2)).toBe(3);
  });

  it("calculates total delivery fee", () => {
    expect(deliveryFee(state)).toBe(4.51);
    expect(deliveryFee(state1)).toBe(3.5);
    expect(deliveryFee(state2)).toBe(7);
  });

  it("calculates final fee", () => {
    expect(finalFee(state)).toBe(4.51);
    expect(finalFee({ ...state3, cartValue: 100 })).toBe(0);
    expect(finalFee(state3)).toBe(15);
  });
});
