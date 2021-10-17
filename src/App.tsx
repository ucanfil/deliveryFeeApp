import React, { useState } from "react";
import "./App.scss";
import { Logo } from "./components/Logo";
import { Result } from "./components/Results";
import { FeeForm } from "./components/FeeForm";

const App = () => {
  const [fee, setFee] = useState(0);

  return (
    <div className="App">
      <Logo />
      <FeeForm setFee={setFee} />
      <Result fee={fee} />
    </div>
  );
};

export default App;
