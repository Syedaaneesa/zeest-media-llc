"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentStatus from "@/components/paymentstatus/PaymentStatus";
import { Suspense } from "react";

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