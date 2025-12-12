require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());

// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Test Product" },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      success_url: "https://your-domain-or-ip/success",
      cancel_url: "https://your-domain-or-ip/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/success", (req, res) => {
  res.send("<h1>Payment Successful 🎉</h1>");
});

app.get("/cancel", (req, res) => {
  res.send("<h1>Payment Cancelled ❌</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
