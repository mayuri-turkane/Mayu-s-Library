"use client";

import { useState } from "react";
import Link from "next/link";
import "./money.css";

const presetAmounts = [100, 250, 500, 1000];

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
};

type RazorpayInstance = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export default function MoneyDonationPage() {
  const [amount, setAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDonate() {
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (amount < 1) {
      alert("Minimum donation amount is ₹1.");
      return;
    }

    setIsLoading(true);

    try {
      // Load Razorpay Checkout
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(
          "Unable to load Razorpay. Please check your internet connection."
        );
      }

      // Create Razorpay order through our server
      const response = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create Razorpay order."
        );
      }

      // Open Razorpay Checkout
      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,

        name: "Mayu's Library",

        description: "Support Mayu's Library",

        order_id: data.order.id,

        theme: {
          color: "#396747",
        },

        handler: async (
          paymentResponse: RazorpayPaymentResponse
        ) => {
          console.log(
            "Razorpay payment response:",
            paymentResponse
          );

          /*
           * IMPORTANT:
           * We will add server-side payment verification
           * in the next step.
           */
          alert(
            "Payment completed successfully! Verification will be added next."
          );
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Donation error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while starting the payment."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="money-donation-page">
      {/* HEADER */}
      <header className="money-donation-header">
        <Link href="/donate" className="money-back-link">
          ← Back to donations
        </Link>

        <Link href="/" className="money-brand">
          Mayu&apos;s <strong>Library</strong>
        </Link>
      </header>

      {/* HERO */}
      <section className="money-donation-hero">
        <span className="money-eyebrow">
          SUPPORT MAYU&apos;S LIBRARY
        </span>

        <h1>
          Give a little.
          <br />
          <em>Keep stories alive.</em>
        </h1>

        <p>
          Your contribution helps us maintain Mayu&apos;s Library
          and make books accessible to curious readers.
        </p>

        {/* PAYMENT CARD */}
        <div className="donation-payment-card">
          <div className="payment-card-header">
            <span>YOUR CONTRIBUTION</span>
            <span>₹ INR</span>
          </div>

          <h2>Choose an amount</h2>

          {/* PRESET AMOUNTS */}
          <div className="amount-options">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                className={
                  amount === preset
                    ? "amount-button active"
                    : "amount-button"
                }
                onClick={() => setAmount(preset)}
                disabled={isLoading}
              >
                ₹{preset}
              </button>
            ))}
          </div>

          {/* CUSTOM AMOUNT */}
          <label htmlFor="custom-amount">
            Or enter your own amount
          </label>

          <div className="amount-input-wrap">
            <span>₹</span>

            <input
              id="custom-amount"
              type="number"
              min="1"
              value={amount}
              onChange={(event) => {
                const value = Number(event.target.value);
                setAmount(value);
              }}
              placeholder="Enter amount"
              disabled={isLoading}
            />
          </div>

          {/* RAZORPAY BUTTON */}
          <button
            type="button"
            className="razorpay-donate-button"
            onClick={handleDonate}
            disabled={isLoading}
          >
            {isLoading
              ? "Opening secure payment..."
              : `Donate ₹${amount || 0}`}

            {!isLoading && <span>→</span>}
          </button>

          <p className="secure-payment-note">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </section>
    </main>
  );
}