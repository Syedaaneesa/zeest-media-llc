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
import { sendPressReleaseEmails } from "@/lib/resend";
import { useAuth } from "@/context/AuthContext";

export default function PaymentStatus() {
    const stripe = useStripe();
    const [status, setStatus] = useState("Checking payment...");
    const [invoiceBody, setInvoiceBody] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const { user } = useAuth();

    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const name =
        searchParams.get("name") ||
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "Customer";

    const title = searchParams.get("title");
    const publishTime = searchParams.get("publishTime");
    const coupon = searchParams.get("coupon");

    const clientSecret = searchParams.get("payment_intent_client_secret");

    const handleFreeOrder = async () => {
        try {
            setStatus("Completing your order...");

            const res = await axios.patch(`/api/press-release/${id}`, {
                paid: true,
                status: "pending",
                coupon: coupon || null,
            });

            const data = res.data.data;

            if (email || user?.email) {
                await sendPressReleaseEmails({
                    name,
                    email: email || user?.email || "",
                    pressId: data.id,
                    pressLink: `${process.env.NEXT_PUBLIC_BASE_URL}/press-release/${data.id}`,
                    paymentId: coupon ? `COUPON-${coupon}` : "FREE_ORDER",
                    pressTitle: title || "Your Press Release",
                    publishTime: publishTime || "instant",
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

    // ✅ PAID ORDER HANDLER
    const handlePaidOrder = async (paymentIntentId: string) => {
        try {
            setStatus("Payment successful!");

            // Get receipt
            const receiptRes = await axios.get(
                `/api/stripe/receipt?payment_intent=${paymentIntentId}`
            );

            const parser = new DOMParser();
            const doc = parser.parseFromString(receiptRes.data.body, "text/html");
            const wrapper = doc.querySelector(".st-Wrapper");

            setInvoiceBody(wrapper ? wrapper.outerHTML : null);

            // Update press release
            const res = await axios.patch(`/api/press-release/${id}`, {
                paid: true,
                stripe_payment_intent: paymentIntentId,
                status: "pending",
                coupon: coupon?.toLocaleLowerCase() || null,
            });

            const data = res.data.data;

            // if (email || user?.email) {
            //     await sendPressReleaseEmails({
            //         name,
            //         email: email || user?.email || "",
            //         pressId: data.id,
            //         pressLink: `${process.env.NEXT_PUBLIC_BASE_URL}/press-release/${data.id}`,
            //         pressTitle: title || "Your Press Release",
            //         paymentId: paymentIntentId,
            //         publishTime: publishTime || "instant",
            //     });
            // }

            toast.success(
                "Payment successful! Your press release has been submitted."
            );
        } catch (err) {
            console.error(err);
            toast.error("Post-payment processing failed.");
        }
    };

    useEffect(() => {
        if (!id) return;

        // ✅ FREE FLOW
        if (!clientSecret) {
            handleFreeOrder();
            return;
        }

        // ✅ STRIPE FLOW
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
                        <p className="mt-4 text-gray-500">
                            Press Release ID: {id}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    {isSuccess ? (
                        <div className="flex items-center justify-center gap-2.5">
                            {invoiceBody || !coupon ? (
                                <Button onClick={createPdfByNewWindow}>
                                    <Download />
                                    Download Invoice
                                </Button>
                            ): <Loader className="animate-spin self-center" />}

                            <Button
                                onClick={() =>
                                    (window.location.href = "/dashboard")
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
// import { sendPressReleaseEmails } from "@/lib/resend";
// import { useAuth } from "@/context/AuthContext";


// export default function PaymentStatus() {
//     const stripe = useStripe();
//     const [status, setStatus] = useState("Checking payment...");
//     const [invoiceBody, setInvoiceBody] = useState<string | null>(null);
//     const { user } = useAuth();

//     const searchParams = useSearchParams();

//     const id = searchParams.get("id");

//     useEffect(() => {
//         if (!stripe) return;
//         const searhParams = new URLSearchParams(window.location.search)
//         const email = searhParams.get("email");
//         const name = searhParams.get("name");
//         const title = searhParams.get("title");
//         const publishTime = searhParams.get("publishTime");
//         const coupon = searhParams.get("coupon");

//         const clientSecret = searhParams.get("payment_intent_client_secret");

//         if (!clientSecret) {
//             setStatus("Payment information not found.");
//             return;
//         }

//         stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
//             if (!paymentIntent) {
//                 setStatus("Unable to retrieve payment.");
//                 return;
//             }

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

//                         await axios.patch(`/api/press-release/${id}`, {
//                             paid: true,
//                             stripe_payment_intent: paymentIntent.id,
//                             status: "pending",
//                         });

//                         // Here Email sending logic will added

//                         // if (user || email) {
//                         //     await sendPressReleaseEmails({
//                         //         name: name || user?.user_metadata.full_name || user?.email?.split("@")[0] || "Customer",
//                         //         email: email || user?.email || "",
//                         //         id: id!,
//                         //         pressLink: `${process.env.NEXT_PUBLIC_BASE_URL}/press-release/${id}`,
//                         //         paymentId: paymentIntent.id,
//                         //         pressTitle: title || "Your Press Release",
//                         //         publishTime: publishTime || "instant",
//                         //     })

//                         // };

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
//     }, [stripe]);

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

//         // Give the browser time to render before printing
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
//                             Press Release ID: {id}
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
//                                 onClick={() => (window.location.href = "/dashboard")}
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