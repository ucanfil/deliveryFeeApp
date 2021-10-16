// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="company logo"></img>
      <form>
        <section>
          <label>Cart value</label>
          <input type="number" />
          <span className="symbol">€</span>
        </section>
        <section>
          <label>Delivery distance</label>
          <input type="number" />
          <span className="symbol">m</span>
        </section>
        <section>
          <label>Amount of items</label>
          <input type="number" />
          <span className="symbol"></span>
        </section>
        <section>
          <label>Date</label>
          <input type="date" />
          <span className="symbol"></span>
        </section>
        <section>
          <label>Time</label>
          <input type="time" />
          <span className="symbol"></span>
        </section>
        <button className="wolt" type="button">
          Calculate delivery price
        </button>
      </form>
    </div>
  );
}

export default App;
