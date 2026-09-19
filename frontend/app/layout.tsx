import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext";

export const metadata: Metadata = {
  title: "Daltar Kenya | Enterprise Systems Hub",
  description:
    "Enterprise ERP, POS, infrastructure, and support services for Kenyan businesses."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <FloatingWhatsApp />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
