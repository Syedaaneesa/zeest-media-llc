"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/Cart";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { ArrowRight, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CardPayment = ({ actualAmount, total, setTotal }: any) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { cart } = useCart();

    const [submitting, setSubmitting] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);

    console.log(actualAmount);
    
    const handleSubmitWithPayment = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                user_id: user.id,
                websites: cart,
                paid: false,
                total: total,
            };

            const res = await axios.post("/api/guest-posts/order", payload);

            if (res.status !== 201 && res.status !== 200) {
                toast.error(res.data.message || "Failed to submit.");
                return;
            }

            const id = res.data.data.id;

            const paymentRes = await fetch("/api/stripe/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: convertToSubcurrency(actualAmount), 
                    id,
                    code: coupon.toLowerCase(),
                }),
            });

            const data = await paymentRes.json();

            if (paymentRes.status !== 200) {
                toast.error(data.error || "Failed to initialize payment.");
                return;
            }

            if (data.free) {
                toast.success(data.message || "Order completed successfully");

                window.location.href = `/cart/checkout/payment?id=${id}&coupon=${coupon}&email=${user.email}&name=${user?.user_metadata?.name}`;
                return;
            }

            // 4. Stripe Payment Flow
            if (!stripe || !elements) {
                toast.error("Stripe not loaded");
                return;
            }

            if (!data.clientSecret) {
                toast.error("Failed to initialize payment.");
                return;
            }

            const { error: submitError } = await elements.submit();

            if (submitError) {
                toast.error(submitError.message);
                return;
            }

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret: data.clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/cart/checkout/payment?id=${id}&email=${user.email}&name=${user?.user_metadata?.name}`,
                },
            });

            if (error) {
                toast.error(error.message || "Payment failed.");
                return;
            }

        } catch (error: any) {
            toast.error(error.message || "Submission failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const applyCoupon = async () => {
        if (!coupon) {
            toast.error("Enter coupon code");
            return;
        }

        try {
            const res = await axios.post("/api/admin/coupons/apply", {
                code: coupon,
                amount: total,
                type: "guest_post",
            });

            const data = res.data.data;

            if (res.status === 200) {
                setTotal(data.finalAmount);
                setDiscount(data.discount);
                toast.success("Coupon Applied!");
            } else {
                toast.error(data.error || "Something went wrong!");
            }
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Failed to apply coupon");
        }
    };

    return (
        <div>
            {/* Coupon Section */}
            <div className="my-5 flex items-end gap-2">
                <div>
                    <Label className="mb-2 block">Coupon</Label>
                    <Input
                        placeholder="Enter coupon"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                </div>

                <Button onClick={applyCoupon}>Apply</Button>
            </div>

            {/* Discount Info */}
            {discount > 0 && (
                <p className="my-3 text-sm text-green-600">
                    You saved ${discount.toFixed(2)}
                </p>
            )}

            {/* Stripe Element (hide if free) */}
            {total > 0 && <PaymentElement />}

            {/* Submit Button */}
            <Button
                onClick={handleSubmitWithPayment}
                disabled={submitting || !user}
                className="mt-3 w-full"
            >
                {submitting ? (
                    <>
                        <Loader className="animate-spin mr-2" />
                        Processing...
                    </>
                ) : (
                    <>
                        <ArrowRight className="mr-2" />
                        {total === 0 ? "Complete Order" : "Pay Now"}
                    </>
                )}
            </Button>
        </div>
    );
};

export default CardPayment;

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/context/AuthContext";
// import { useCart } from "@/context/Cart";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import {
//     useStripe,
//     useElements,
//     PaymentElement,
// } from "@stripe/react-stripe-js"
// import axios from "axios";
// import { ArrowRight, ArrowUp, CreditCard, Loader } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// const CardPayment = ({ total, setTotal }: any) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const { user } = useAuth();
//     const { cart } = useCart();
//     const [submitting, setSubmitting] = useState(false);
//     const [coupon, setCoupon] = useState('')
//     const [discount, setDiscount] = useState(0)

//     const handleSubmitWithPayment = async () => {
//         if (!stripe || !elements || !user) {
//             toast.error("Something went wrong!");
//             return;
//         }

//         try {
//             setSubmitting(true);

//             const payload = {
//                 user_id: user.id,
//                 websites: cart,
//                 paid: false,
//                 total: total,
//             };

//             const res = await axios.post("/api/guest-posts/order", payload);

//             if (res.status !== 201 && res.status !== 200) {
//                 toast.error(res.data.message || "Failed to submit.");
//                 return;
//             }

//             const id = res.data.data.id;

//             const paymentRes = await fetch("/api/stripe/create-payment-intent", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     amount: convertToSubcurrency(Number(total)),
//                     id,
//                     code: coupon,
//                 }),
//             });

//             const data = await paymentRes.json();

//             if (paymentRes.status !== 200) {
//                 toast.error(data.error || "Failed to initialize payment.");
//                 return;
//             }

//             if (data.free) {
//                 toast.success(data.message || "Order completed with 100% discount");
//                 window.location.href = `/cart/checkout/payment?id=${id}&email=${user.email}&name=${user?.user_metadata?.name}`;
//                 return;
//             }

//             if (!data.clientSecret) {
//                 toast.error("Failed to initialize payment.");
//                 return;
//             }

//             const { error: submitError } = await elements.submit();

//             if (submitError) {
//                 toast.error(submitError.message);
//                 return;
//             }

//             const { error } = await stripe.confirmPayment({
//                 elements,
//                 clientSecret: data.clientSecret,
//                 confirmParams: {
//                     return_url: `${window.location.origin}/cart/checkout/payment?id=${id}&email=${user.email}&name=${user?.user_metadata?.name}`,
//                 },
//             });

//             if (error) {
//                 toast.error(error.message || "Payment failed.");
//                 return;
//             }

//         } catch (error: any) {
//             toast.error(error.message || "Submission failed.");
//         } finally {
//             setSubmitting(false);
//         }
//     };


//     const applyCoupon = async () => {
//         try {
//             const res = await axios.post("/api/admin/coupons/apply", {
//                 code: coupon,
//                 amount: total,
//                 type: "guest_post",
//             });

//             const data = res.data.data;

//             if (res.status == 200) {

//                 setTotal(data.finalAmount)
//                 setDiscount(data.discount)
//                 toast.success("Token Applied!")
//                 return;
//             } else {
//                 toast.error(data.error || "Something Went Wrong!")
//                 return;
//             }
//         } catch (err: any) {
//             toast.error("Failed to apply coupon");
//         }
//     };

//     return (
//         <div className="">
//             <div className="coupons my-5 flex items-end gap-2">

//                 <div className='relative'>
//                     <Label className="text-forground mb-2 block">Coupon</Label>
//                     <Input
//                         placeholder="Put Your Coupon"
//                         value={coupon}
//                         onChange={(e) => setCoupon(e.target.value)}
//                         className="w-fit border-foreground/20 text-forground placeholder:text-forground/40"
//                     />

//                 </div>

//                 <Button className='text-white bg-primary' onClick={applyCoupon}>Apply Coupon</Button>

//             </div>

//             {discount ? <p className='my-5 text-sm text-green-600'>You saved ${discount.toFixed(2)}</p> : ''}

//             <PaymentElement />
//             <Button onClick={handleSubmitWithPayment} disabled={submitting || !stripe || !elements} className="text-white mt-3">
//                 {
//                     submitting ? (
//                         <>
//                             <Loader className="animate-spin" />
//                             Processing Payment
//                         </>
//                     ) : (
//                         <>
//                             <ArrowRight />
//                             Pay Now
//                         </>
//                     )
//                 }
//             </Button>
//         </div>
//     )
// }

// export default CardPayment