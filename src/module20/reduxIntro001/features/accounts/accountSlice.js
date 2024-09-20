import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { deposit, payLoan, requestLoan, withdraw } from "./accountSliceOLD";
export const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    // in these new reducers we no longer are required to return the entire state
    // we just modify what we want
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        // the object that this prepare returns becomes the action object received by the reducer
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        // we do not wanna modify the state when the loan is already > 0, so return from the function without having to return state
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});
// take the actions out of the objects before doing named exports

export const { withdraw, requestLoan, payLoan } = accountSlice.actions; // createSlice gives us actions and reducer, which is present in the object accountSlice
export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  return async function (dispatch, getState) {
    // if we return a function then redux knows that this is the async action that we want to execute before dispatching anything to the store

    // 1. API Call
    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    console.log(data);
    const converted = data.rates.USD;
    // 2. return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export default accountSlice.reducer;
/* 
export default function accountReducer(state = initialStateAccount, action) {
  // goal of reducer is to calculate new state based one the new state based on the current state and on the received action.
  // reducers are not allowed to modify existing states, and they are also not allowed to do any async logic or other side effects
  // in reducer of useReducer, we did not need to pass the initial state to the reducer, but here in reducer of redux, we need to pass the initial state to the reducer

  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //   LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      // it is not advised to throw any error, it is advised to return the state back without any changes.
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  return async function (dispatch, getState) {
    // if we return a function then redux knows that this is the async action that we want to execute before dispatching anything to the store

    // 1. API Call
    const host = "api.frankfurter.app";
    const response = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    console.log(data);
    const converted = data.rates.USD;
    // 2. return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
 */
