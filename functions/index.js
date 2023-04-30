const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")(
  "sk_test_51N2IIWSHrafCj55hw2NKMzG7DFB5Qw4UL044xpzbCmw4TNgqPQdkypXaZXjr6MjvZOPwYqSkhilhGOVnv1msZtWj00vUWOZIYm"
);
import { Stripe } from "@stripe/stripe-js";

// API

// -APP config
const app = express();

// 	MIDDLEWAREs
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

app.post("/payments/create/", async (req, res) => {
  const total = req.query.total;
  console.log("the payment request recieve of", total);
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// https://localhost:5001/clone-8dd68/us-central/api
