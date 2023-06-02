import React,{useState} from 'react'
import {
    Elements,
    CardElement, useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";

export default function Teststripe() {
    const stripe = loadStripe(
        "pk_test_51HEvMzIfM6gV7KrMQJr4ehPNepKbMQmJ4NgwyQLdNtsprtD1SFNSm3wzvrD5RiDgPaWxnFN6sIJ7r1s8CHaa5Quj00jWsso6VZ"
      );
      return (
        <Elements stripe={stripe}>
          <CheckoutForm />
        </Elements>
      );
}

function CheckoutForm() {
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const payMoney = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      setPaymentLoading(true);
      const clientSecret = "sk_test_51HEvMzIfM6gV7KrM0erNRvrGggXFskmb7CRFmXrAfvKZ79yys60vYxmcbdG1ubIw0XaXRvXx4Yrgo8s44GvJ1Xta00Wd6ssoSW";
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Anish",
          },
        },
      });
      setPaymentLoading(false);
      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("Success!");
        }
      }
    };
  
    return (
      <div
        style={{
          padding: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <form
            style={{
              display: "block",
              width: "100%",
            }}
            onSubmit = {payMoney}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardElement
                className="card"
                options={{
                  style: {
                    base: {
                      backgroundColor: "white"
                    } 
                  },
                }}
              />
              <button
                className="pay-button"
                disabled={isPaymentLoading}
              >
                {isPaymentLoading ? "Loading..." : "Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }