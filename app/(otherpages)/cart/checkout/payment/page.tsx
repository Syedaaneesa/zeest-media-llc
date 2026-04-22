"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Suspense } from "react";
import PaymentStatus from "./PaymentStatus";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Page() {

  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={<p>loading...</p>}>
      <PaymentStatus />
      </Suspense>
    </Elements>
  );
}