import "./App.css";
import Header from "./Header";
import Home from "./Home";
import React, { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51N2IIWSHrafCj55hob37f6OPosZqc8hylXmNzozrvfhVSAByrjcQlIJbceMMQUeRqcznXejJEncIDhdCLS0B9HRc00BokY1vzm"
);

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((test) => {
      if (test) console.log("authUser", test.email);
      console.log("The auth user", test);

      if (test) {
        dispatch({
          type: "SET_USER",
          user: test,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route
            path="/checkout"
            element={
              <>
                <Header /> <Checkout />
              </>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
