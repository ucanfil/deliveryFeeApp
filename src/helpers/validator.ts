import { FormValues } from "../enums/FormValues";
import { IErrors } from "../interfaces/interfaces";

const positiveIntegerRegex = /^[1-9]\d*$/;
const positiveNumberRegex =
  /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/;
const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const validate = (values: { [key in FormValues]: string }) => {
  const errors: IErrors = {};

  for (const value in values) {
    switch (value) {
      case FormValues.cartValue:
      case FormValues.deliveryDistance:
        if (!positiveNumberRegex.test(values[value])) {
          errors[value] = "Please provide a positive number";
        }
        break;
      case FormValues.itemAmount:
        if (!positiveIntegerRegex.test(values[value])) {
          errors[value] = "Please provide a positive integer";
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
