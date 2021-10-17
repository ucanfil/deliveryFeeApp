import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IFormField, ISetFee } from "../interfaces/interfaces";
import { finalFee } from "../helpers/calculator";
import { validate } from "../helpers/validator";

export const FeeForm = ({ setFee }: ISetFee) => {
  return (
    <Formik
      initialValues={{
        cartValue: "",
        deliveryDistance: "",
        itemAmount: "",
        date: "",
        time: "",
      }}
      validate={validate}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        // actions.resetForm();

        const { cartValue, deliveryDistance, itemAmount, date, time } = values;

        setFee(
          finalFee({
            cartValue: Number(cartValue),
            deliveryDistance: Number(deliveryDistance),
            itemAmount: Number(itemAmount),
            date,
            time,
          })
        );
      }}
    >
      {({ isSubmitting }) => (
        <Form onChange={() => setFee(0)}>
          <FormField
            labelText="Cart value"
            name="cartValue"
            inputType="number"
            symbol="€"
          />
          <FormField
            labelText="Delivery distance"
            name="deliveryDistance"
            inputType="number"
            symbol="m"
          />
          <FormField
            labelText="Amount of items"
            name="itemAmount"
            inputType="number"
            symbol=""
          />
          <FormField labelText="Date" name="date" inputType="date" symbol="" />
          <FormField labelText="Time" name="time" inputType="time" symbol="" />
          <button type="submit" className="wolt" disabled={isSubmitting}>
            Calculate delivery price
          </button>
        </Form>
      )}
    </Formik>
  );
};

const FormField = ({ labelText, name, inputType, symbol }: IFormField) => (
  <>
    <section>
      <label htmlFor={name}>{labelText}</label>
      <Field id={name} name={name} type={inputType} />
      <span className="symbol">{symbol}</span>
    </section>
    <ErrorMessage name={name} component="div" className="error" />
  </>
);
