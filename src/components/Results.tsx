import React from "react";
import { IFee } from "../interfaces/interfaces";

export const Result = ({ fee }: IFee) =>
  fee ? <div>Delivery fee: {fee}</div> : null;
