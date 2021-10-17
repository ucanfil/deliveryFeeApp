export interface IForm {
  cartValue: number;
  deliveryDistance: number;
  itemAmount: number;
  date: string;
  time: string;
}

export interface IErrors {
  cartValue?: string;
  deliveryDistance?: string;
  itemAmount?: string;
  date?: string;
  time?: string;
}

export interface IFormField {
  labelText: string;
  name: string;
  inputType: string;
  symbol: string;
}

export interface IFee {
  fee: number;
}

export interface ISetFee {
  setFee: (fee: number) => void;
}
