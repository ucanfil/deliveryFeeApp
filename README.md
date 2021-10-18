# Delivery Fee Calculator

Application calculates delivery fee based on some conditions, see specifications further down to this page.

I'm not a functional programming guru or anything, trying to learn it still. But to me, it helps you write cleaner functions, pure functions, and allows function compositions. Therefore I wrote calculator logic with the help of [Ramda.js](https://ramdajs.com/docs/) a functional programming library for JavaScript.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Unzip the homework.zip file and in the unzipped project directory:

* Install all project dependencies with `npm install`
* Start the development server with `npm start` on `localhost:3000`
* To run the tests use `npm test`
* If you bump into any dependency error even after following the steps above, it might be related with some of the dependencies clashes with your node version. My node version was `v14.16.0` so as a last resort downgrading/upgrading to this version might help you run it successfully.

## Specification

Application calculates delivery fee based on some conditions:

    - If the cart value is less than 10€, a small order surcharge is added to the delivery
    price. The surcharge is the difference between the cart value and 10€. For example if
    the cart value is 8.90€, the surcharge will be 1.10€.

    - A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer
    than that, 1€ is added for every additional 500 meters that the courier needs to
    travel before reaching the destination. Even if the distance would be shorter than
    500 meters, the minimum fee is always 1€.

    - If the amount of items is five or more, an additional 50 cent surcharge is added for
    each items above five.

    - The delivery fee can never be more than 15€, including possible surcharges.
    - The delivery is free (0€) when the cart value is equal or more than 100€.
    - During the Friday rush (3 - 7 PM UTC), the delivery fee will be multiplied by 1.1x.
    However the fee still cannot be more than the max (15€).

## Built With

* React
* TypeScript
* Ramda.js
* Formik
* Flexbox, Scss

## Authors

  - Burak Tilek - [Ucanfil](https://github.com/ucanfil)

## Acknowledgements

* Neomorphic form design [from](https://codepen.io/swapnet/pen/QWwPVwE)