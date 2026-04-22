"use client";

import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Loader } from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/Cart";
import { sendGuestPostEmails } from "@/lib/resend";

export default function PaymentStatus() {
    const stripe = useStripe();
    const [status, setStatus] = useState("Checking payment...");
    const [invoiceBody, setInvoiceBody] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const name = searchParams.get("name") || "Dear User";
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const coupon = searchParams.get("coupon");

    const { setCart } = useCart();

    const handleFreeOrder = async () => {
        try {
            setStatus("Completing your order...");

            const order = await axios.patch("/api/guest-posts/order", {
                orderId: id,
                paid: true,
                coupon: coupon || null,
            });

            const data = order.data.data;

            setCart([]);

            if (email) {
                await sendGuestPostEmails({
                    name,
                    email,
                    orderId: data.id,
                    websites: data.websites,
                    total: data.total,
                    paid: true,
                    paymentId: coupon ? `COUPON-${coupon}` : "FREE_ORDER",
                });
            }

            setStatus("Order completed successfully!");
            toast.success("Order completed with 100% discount!");
        } catch (err) {
            console.error(err);
            setStatus("Failed to complete order.");
            toast.error("Something went wrong.");
        }
    };

    const handlePaidOrder = async (paymentIntentId: string) => {
        try {
            setStatus("Payment successful!");

            // Fetch receipt
            const receiptRes = await axios.get(
                `/api/stripe/receipt?payment_intent=${paymentIntentId}`
            );

            const parser = new DOMParser();
            const doc = parser.parseFromString(receiptRes.data.body, "text/html");
            const wrapper = doc.querySelector(".st-Wrapper");

            setInvoiceBody(wrapper ? wrapper.outerHTML : null);

            // Update order
            const order = await axios.patch("/api/guest-posts/order", {
                orderId: id,
                paid: true,
                coupon: coupon?.toLocaleLowerCase() || null,
                stripe_payment_intent: paymentIntentId,
            });

            const data = order.data.data;

            setCart([]);

            if (email) {
                await sendGuestPostEmails({
                    name,
                    email,
                    orderId: data.id,
                    websites: data.websites,
                    total: data.total,
                    paid: true,
                    paymentId: paymentIntentId,
                });
            }

            toast.success("Payment successful!");
        } catch (err) {
            console.error(err);
            toast.error("Post-payment processing failed.");
        }
    };

    useEffect(() => {
        if (!id) return;

        if (!clientSecret) {
            handleFreeOrder();
            return;
        }

        if (!stripe) return;

        stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
            if (!paymentIntent) {
                setStatus("Unable to retrieve payment.");
                return;
            }

            switch (paymentIntent.status) {
                case "succeeded":
                    await handlePaidOrder(paymentIntent.id);
                    break;

                case "processing":
                    setStatus("Payment processing...");
                    toast.info("Your payment is still processing.");
                    break;

                case "requires_payment_method":
                    setStatus("Payment failed. Please try again.");
                    toast.error("Payment failed.");
                    break;

                default:
                    setStatus("Something went wrong.");
                    toast.error("Unexpected error.");
            }
        });
    }, [stripe, id]);

    const createPdfByNewWindow = () => {
        if (!invoiceBody) {
            return toast.error("Invoice not found");
        }

        const newWindow = window.open("", "_blank");
        if (!newWindow) return;

        newWindow.document.open();
        newWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
          </head>
          <body>
            ${invoiceBody}
          </body>
        </html>
        `);
        newWindow.document.close();

        setTimeout(() => {
            newWindow.focus();
            newWindow.print();
            newWindow.close();
        }, 300);
    };

    const isSuccess =
        status.toLowerCase().includes("successful") ||
        status.toLowerCase().includes("completed");

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Payment Status</CardTitle>
                    <CardDescription>{status}</CardDescription>

                    <CardAction>
                        {isSuccess && <CheckCircle2 color="green" />}
                    </CardAction>
                </CardHeader>

                <CardContent>
                    {id && (
                        <p className="mt-4 text-gray-500">Order ID: {id}</p>
                    )}
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    {isSuccess ? (
                        <div className="flex items-center justify-center gap-2.5">
                            {invoiceBody && (
                                <Button onClick={createPdfByNewWindow}>
                                    <Download />
                                    Download Invoice
                                </Button>
                            )}

                            <Button
                                onClick={() =>
                                    (window.location.href =
                                        "/dashboard/guest-posts?tab=guestposting")
                                }
                            >
                                Back to Dashboard
                            </Button>
                        </div>
                    ) : (
                        <Loader className="animate-spin self-center" />
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}


// "use client";

// import { useEffect, useState } from "react";
// import { useStripe } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2, Download, Loader } from "lucide-react";
// import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useSearchParams } from "next/navigation";
// import { useCart } from "@/context/Cart";
// import { sendGuestPostEmails } from "@/lib/resend";


// export default function PaymentStatus() {
//     const stripe = useStripe();
//     const [status, setStatus] = useState("Checking payment...");
//     const [invoiceBody, setInvoiceBody] = useState<string | null>(null);

//     const searchParams = useSearchParams();

//     const id = searchParams.get("id");
//     const email = searchParams.get("email");
//     const name = searchParams.get("name") || 'Dear User';
//     const { setCart } = useCart();

//     const clientSecret = searchParams.get("payment_intent_client_secret");

//     useEffect(() => {

//         if (!stripe || !id) return;

//         if (!clientSecret) {
//             setStatus("Payment information not found.");
//             return;
//         }


//         stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
//             if (!paymentIntent) {
//                 setStatus("Unable to retrieve payment.");
//                 return;
//             }
//             console.log(paymentIntent);


//             switch (paymentIntent.status) {
//                 case "succeeded":
//                     setStatus("Payment successful!");

//                     try {
//                         const receiptRes = await axios.get(
//                             `/api/stripe/receipt?payment_intent=${paymentIntent.id}`
//                         );

//                         const parser = new DOMParser();
//                         const doc = parser.parseFromString(receiptRes.data.body, "text/html");

//                         const wrapper = doc.querySelector(".st-Wrapper");

//                         setInvoiceBody(wrapper ? wrapper.outerHTML : null);

//                         const order = await axios.patch("/api/guest-posts/order", {
//                             orderId: id,
//                             paid: true,
//                             stripe_payment_intent: paymentIntent.id,
//                         });

//                         setCart([])
                        
//                         const data =  order.data.data

//                         if (email) {
//                            await sendGuestPostEmails({
//                             name: name,
//                             email,
//                             orderId: data.id,
//                             websites: data.websites,
//                             total: data.total,
//                             paid: data.paid,
//                             paymentId: data.stripe_payment_intent
//                            })
//                         }

//                         toast.success(
//                             "Payment successful! Your press release has been submitted."
//                         );
//                     } catch (err) {
//                         console.error(err);
//                     }

//                     break;

//                 case "processing":
//                     setStatus("Payment processing.");
//                     toast.info('Your payment is still processing. We will update you once it is complete.');
//                     break;

//                 case "requires_payment_method":
//                     setStatus("Payment failed. Please try again.");
//                     toast.error('Payment failed. Please try again with a different payment method.');
//                     break;

//                 default:
//                     setStatus("Something went wrong.");
//                     toast.error('An unexpected error occurred. Please contact support.');
//             }
//         });
//     }, [stripe, id]);

//     const createPdfByNewWindow = () => {
//         if (!invoiceBody) {
//             return toast.error("Invoice Not Found");
//         }

//         const newWindow = window.open("", "_blank");
//         if (!newWindow) return;

//         newWindow.document.open();
//         newWindow.document.write(`
//         <html>
//           <head>
//             <title>Invoice</title>
//           </head>
//           <body>
//             ${invoiceBody}
//           </body>
//         </html>
//     `);
//         newWindow.document.close();

//         setTimeout(() => {
//             newWindow.focus();
//             newWindow.print();
//             newWindow.close();
//         }, 300);
//     };


//     return (
//         <div className="w-full h-screen flex items-center justify-center">

//             <Card className="w-full max-w-sm">
//                 <CardHeader>
//                     <CardTitle>Payment Status</CardTitle>
//                     <CardDescription>
//                         {status}
//                     </CardDescription>

//                     <CardAction>{status == "Payment successful!" && <CheckCircle2 color="green" />}</CardAction>

//                 </CardHeader>
//                 <CardContent>
//                     {id && (
//                         <p className="mt-4 text-gray-500">
//                             Order ID: {id}
//                         </p>
//                     )}
//                 </CardContent>
//                 <CardFooter className="flex-col gap-2">

//                     {invoiceBody ? (

//                         <div className="flex items-center justify-center gap-2.5">
//                             <Button
//                                 className="mt-6"
//                                 onClick={() => createPdfByNewWindow()}
//                             >
//                                 <Download />
//                                 Download Invoice
//                             </Button>


//                             <Button
//                                 className="mt-6"
//                                 onClick={() => (window.location.href = "/dashboard/guest-posts?tab=guestposting")}
//                             >
//                                 Back to Dashboard
//                             </Button>
//                         </div>

//                     ) : <Loader className="animate-spin self-center" />}
//                 </CardFooter>
//             </Card>

//         </div>
//     );
// }