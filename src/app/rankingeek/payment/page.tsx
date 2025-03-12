"use client";
import { useState } from "react";
import Script from "next/script";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function Home() {
  // Set the fixed amount to 199 rupees.
  const fixedAmount = 199;
  const router =useRouter();
  // Since the amount is fixed, we don't allow changing it.
  const [amount] = useState<number>(fixedAmount);
  const [holderName, setHolderName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Zod schema for validating the form fields.
  // Even though amount is fixed, we include it in the schema.
  const orderSchema = z.object({
    amount: z.number().min(1, { message: "Amount must be at least 1" }),
    holderName: z.string().min(1, { message: "Holder Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  });

  const createOrder = async () => {
    // Validate input fields using Zod.
    try {
      orderSchema.parse({ amount, holderName, email, phone });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((e) => {
          const field = e.path[0];
          fieldErrors[field] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    try {
      // 1. Create order on server.
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Multiply amount by 100 to convert to the smallest currency unit (paise).
        body: JSON.stringify({ amount: amount * 100 }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        console.error("Error creating order:", data.error);
        return;
      }

      // 2. Prepare Razorpay Checkout options.
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Publishable key.
        order_id: data.id, // Order ID from your server.
        amount: data.amount,
        currency: data.currency,
        handler: async function (response: any) {
          // 3. (Optional) Verify payment on server if needed.
          const verifyRes = await fetch("/api/verifyOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.isOk) {
            console.log("Payment successful!");
            alert("Payment Successful!");
            router.push("/rankingeek/usergymdiet")
          } else {
            console.error("Payment verification failed.");
            alert("Payment verification failed.");
          }
        },
        
      };

      // 4. Open the Razorpay Checkout form.
      const paymentObject = new (window as any).Razorpay(paymentData);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-serif bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
      {/* Razorpay's Checkout script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 font-serif">
          Create Order
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="holderName" className="block text-gray-700 font-medium mb-1">
              Holder Name
            </label>
            <input
              id="holderName"
              type="text"
              placeholder="Holder Name"
              className="border border-gray-300 p-3 rounded-md w-full outline-none"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
            />
            {errors.holderName && (
              <p className="text-red-500 text-xs mt-1">{errors.holderName}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 p-3 rounded-md w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 p-3 rounded-md w-full outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
           <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md font-sans"
            onClick={createOrder}
          >
            ₹ {amount} Pay Now 
          </button>
        </div>
      </div>
    </div>
  );
}
