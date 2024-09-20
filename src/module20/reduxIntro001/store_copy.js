// this file contains pure redux code
import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}
// const store = createStore(accountReducer); //store is created. createStore returns the store
// now on this store we can dispatch actions
// const customerStore = createStore(customerReducer);
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
// store.dispatch({ type: "account/deposit", payload: 500 }); //similar to the dispatch  of useReducer

// console.log("HEY REDUX");
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// // Learn the subscribe store in redux

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// Action Creator
// we are going to create one action creator for each possible action

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(1200));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(2500, "Buy a car"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Abhishek Kumar", "IN256"));
console.log(store.getState());
