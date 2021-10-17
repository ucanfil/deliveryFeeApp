import pipe from "ramda/es/pipe";
import lte from "ramda/es/lte";
import gt from "ramda/es/gt";
import subtract from "ramda/es/subtract";
import divide from "ramda/es/divide";
import multiply from "ramda/es/multiply";
import equals from "ramda/es/equals";
import both from "ramda/es/both";
import map from "ramda/es/map";
import always from "ramda/es/always";
import ifElse from "ramda/es/ifElse";
import when from "ramda/es/when";
import sum from "ramda/es/sum";
import add from "ramda/es/add";
import __ from "ramda/es/__";

import { IForm } from "../interfaces/interfaces";

const round = (num: number) => Number(num.toFixed(2));
const greaterThanOrEqualTo = (num: number) => lte(num);
const lessThan = (num: number) => gt(num);
const lessThanOrEqualTo1000 = lessThan(1001);
const lessThanOrEqualTo19 = lessThan(19);
const greaterThanOrEqualTo100 = greaterThanOrEqualTo(100);
const greaterThanOrEqualTo15 = greaterThanOrEqualTo(15);
const greaterThanOrEqualTo10 = greaterThanOrEqualTo(10);
const greaterThanOrEqualTo5 = greaterThanOrEqualTo(5);
const isCartValueGteTo100 = (state: IForm) =>
  greaterThanOrEqualTo100(state.cartValue);
const subtractFrom10 = pipe(subtract(10), round);
const minus = (num: number) => pipe(subtract(__, num), round);
const divideTo = (num: number) => pipe(divide(__, num), round);
const multiplyWith = (num: number) => pipe(multiply(num), round);
const minus4 = minus(4);
const minus1000 = minus(1000);
const divideTo500 = divideTo(500);
const multiplyWith0_50 = multiplyWith(0.5);
const multiplyWith1_10 = multiplyWith(1.1);

const getDate = (state: IForm) =>
  new Date(Date.parse(`${state.date}T${state.time}:00Z`));

export const getDateDay = (state: IForm) => getDate(state).getUTCDay();
export const getDateHours = (state: IForm) => getDate(state).getUTCHours();

const isFriday = pipe(getDateDay, equals(5));

const isRushHour = pipe(
  getDateHours,
  both(greaterThanOrEqualTo15, lessThanOrEqualTo19)
);

const isOnFridayRushhour = both(isFriday, isRushHour);

const fees = (state: IForm) =>
  map(
    (fn) => fn(state),
    [feeFromCartSurcharge, feeFromDistance, feeFromItemAmount]
  );

const totalFees = pipe(fees, sum);

const totalFeesWithMultiplier = pipe(totalFees, multiplyWith1_10);

const feeFromCartSurcharge = (state: IForm) =>
  ifElse(greaterThanOrEqualTo10, always(0), subtractFrom10)(state.cartValue);

const feeFromDistance = (state: IForm) =>
  ifElse(
    lessThanOrEqualTo1000,
    always(2),
    pipe(minus1000, divideTo500, Math.ceil, add(2))
  )(state.deliveryDistance);

const feeFromItemAmount = (state: IForm) =>
  ifElse(
    greaterThanOrEqualTo5,
    pipe(minus4, multiplyWith0_50),
    always(0)
  )(state.itemAmount);

export const deliveryFee = ifElse(
  isCartValueGteTo100,
  always(0),
  ifElse(isOnFridayRushhour, totalFeesWithMultiplier, totalFees)
);

export const finalFee = (fee: number) =>
  when(greaterThanOrEqualTo15, always(15))(fee);
