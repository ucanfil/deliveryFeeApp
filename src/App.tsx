import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
} from "formik";
import { finalFee, deliveryFee } from "./helpers/calculator";

export type IForm = {
  cartValue: number;
  deliveryDistance: number;
  itemAmount: number;
  date: string;
  time: string;
};

interface IErrors {
  cartValue?: string;
  deliveryDistance?: string;
  itemAmount?: string;
  date?: string;
  time?: string;
}

enum FormValues {
  cartValue = "cartValue",
  deliveryDistance = "deliveryDistance",
  itemAmount = "itemAmount",
  date = "date",
  time = "time",
}

const positiveNumberRegex =
  /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/;
const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const App = () => {
  const initialValues = {
    cartValue: "",
    deliveryDistance: "",
    itemAmount: "",
    date: "",
    time: "",
  };

  const [fee, setFee] = useState(0);

  const calculate = (values: IForm) => {
    setFee(finalFee(deliveryFee(values)));
  };

  const validate = (values: { [key in FormValues]: string }) => {
    const errors: IErrors = {};

    for (const value in values) {
      switch (value) {
        case FormValues.cartValue:
        case FormValues.deliveryDistance:
        case FormValues.itemAmount:
          if (!positiveNumberRegex.test(values[value])) {
            errors[value] = "Please provide a positive number";
          }
          break;
        case FormValues.date:
          if (!dateRegex.test(String(values[value]))) {
            errors[value] = "Please enter a date in correct format mm/dd/yyyy";
          }
          break;
        case FormValues.time:
          if (!timeRegex.test(String(values[value]))) {
            errors[value] = "Please enter a time in correct format HH:MM";
          }
          break;
      }
    }

    return errors;
  };

  return (
    <div className="App">
      <img src={logo} alt="company logo"></img>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);

          const { cartValue, deliveryDistance, itemAmount, date, time } =
            values;

          calculate({
            cartValue: Number(cartValue),
            deliveryDistance: Number(deliveryDistance),
            itemAmount: Number(itemAmount),
            date,
            time,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form onChange={() => setFee(0)}>
            <FormField
              {...{
                labelText: "Cart value",
                name: "cartValue",
                inputType: "number",
                symbol: "€",
              }}
            />
            <ErrorMessage name="cartValue" component="div" className="error" />
            <FormField
              {...{
                labelText: "Delivery distance",
                name: "deliveryDistance",
                inputType: "number",
                symbol: "m",
              }}
            />
            <ErrorMessage
              name="deliveryDistance"
              component="div"
              className="error"
            />
            <FormField
              {...{
                labelText: "Amount of items",
                name: "itemAmount",
                inputType: "number",
                symbol: "",
              }}
            />
            <ErrorMessage name="itemAmount" component="div" className="error" />
            <FormField
              {...{
                labelText: "Date",
                name: "date",
                inputType: "date",
                symbol: "",
              }}
            />
            <ErrorMessage name="date" component="div" className="error" />
            <FormField
              {...{
                labelText: "Time",
                name: "time",
                inputType: "time",
                symbol: "",
              }}
            />
            <ErrorMessage name="time" component="div" className="error" />
            <button type="submit" className="wolt" disabled={isSubmitting}>
              Calculate delivery price
            </button>
          </Form>
        )}
      </Formik>
      <Result fee={fee} />
    </div>
  );
};

interface IFormField {
  labelText: string;
  name: string;
  inputType: string;
  symbol: string;
}

const FormField = ({ labelText, name, inputType, symbol }: IFormField) => (
  <section>
    <label htmlFor={name}>{labelText}</label>
    <Field id={name} name={name} type={inputType} />
    <span className="symbol">{symbol}</span>
  </section>
);

// TODO: Refactor if possible
const Result = (props: { fee: number }) =>
  props.fee ? <div>Delivery fee: {props.fee}</div> : null;

export default App;
