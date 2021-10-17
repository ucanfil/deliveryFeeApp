import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Calculate delivery price button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Calculate delivery price/i);
  expect(linkElement).toBeInTheDocument();
});
