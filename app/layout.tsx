import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PressProvider } from "@/context/PressReleaseContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import { CartProvider } from "@/context/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeest Media | Press Release Distribution & Digital Marketing",
  description: "Zeest Media offers a range of products including press release distribution, content marketing, guest posting, web design and BPO services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>

          <AuthProvider>

            <PressProvider>
              <CartProvider>



                {children}
                <Toaster />
                {/* 
              <Script id="tawk-to" strategy="afterInteractive">
              {`
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),
                s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/62ebcfdb54f06e12d88cebe6/1g9ki7ss2';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
                `}
                </Script> */}

              </CartProvider>
            </PressProvider>

          </AuthProvider>

        </TooltipProvider>
      </body>
    </html>
  );
}
