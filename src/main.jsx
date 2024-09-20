// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import App from "./App.jsx";
import "./index.css";
import "./module20/reduxIntro001/index.css";
import "./module20/reduxIntro001/store.js";
import store from "./module20/reduxIntro001/store.js";
store.dispatch({ type: "account/deposit", payload: 250 });
console.log(store.getState());
import App from "./module20/reduxIntro001/App.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
