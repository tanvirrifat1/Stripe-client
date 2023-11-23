import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import PaymentHistory from "../PaymentHistory/PaymentHistory";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [value, setValue] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState("12");

  const { data, refetch, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/payment");
      return res.json();
    },
  });

  useEffect(() => {
    if (value === "rifat01") {
      const discount = (parseFloat(price) * 25) / 100;
      const discountPrice = parseFloat(price) - discount;
      setPrice((prevPrice) => discountPrice.toString());
    }

    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [value]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "user",
            email: "user@gmail.com",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        name: "user",
        email: "user@gmail.com",
        transactionId: paymentIntent.id,
      };

      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire("Payment Successfully!");
            setTransactionId(paymentIntent.id);
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="my-2 text-2xl">Price: 12$</h1>
        <h1 className="my-2">
          if you use{" "}
          <span className="text-purple-600 font-semibold text-xl">rifat01</span>{" "}
          coupon code you will get 25% discount
        </h1>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs my-3"
        />
        <CardElement
          className=" border h-20 p-6 border-black"
          options={{
            style: {
              base: {
                fontSize: "15px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay now
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      <PaymentHistory data={data} />
    </div>
  );
};

export default CheckOutForm;
