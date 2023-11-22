import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckBox";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_key);

const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
