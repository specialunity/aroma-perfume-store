import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";

function Checkout() {
  const { cartItems, cartSubtotal, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const update = (field, value) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrderNumber = `AR-${Date.now().toString().slice(-8)}`;

    const order = {
      orderNumber: newOrderNumber,
      customer,
      paymentMethod,
      items: cartItems,
      total: cartSubtotal,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("aroma-last-order", JSON.stringify(order));

    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    clearCart();
  };

  if (!cartItems.length && !orderPlaced) {
    return (
      <div className="container-aroma flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          Checkout
        </p>

        <h1 className="mt-3 text-4xl font-light">
          Your bag is empty
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
          Add a fragrance to your shopping bag before continuing to checkout.
        </p>

        <Link to="/shop" className="mt-7">
          <Button showArrow>Shop Perfumes</Button>
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container-aroma flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5">
          <CheckCircle
            size={42}
            strokeWidth={1.2}
            className="text-[#d4af37]"
          />
        </div>

        <p className="mt-7 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          Order Confirmed
        </p>

        <h1 className="mt-3 text-4xl font-light sm:text-5xl">
          Thank you, {customer.name.split(" ")[0]}.
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500">
          Your AROMA order has been placed successfully. This college-project
          checkout stores the order locally in your browser.
        </p>

        <div className="mt-8 w-full max-w-md border border-white/10 bg-[#111] p-7 text-left">
          <div className="flex justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-widest text-gray-600">
              Order Number
            </span>
            <span className="text-sm text-[#d4af37]">
              {orderNumber}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/10 py-4">
            <span className="text-xs uppercase tracking-widest text-gray-600">
              Payment
            </span>
            <span className="text-sm text-white">
              {paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>
          </div>

          <div className="flex justify-between pt-4">
            <span className="text-xs uppercase tracking-widest text-gray-600">
              Total
            </span>
            <span className="text-lg text-white">
              ₹{cartSubtotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>

          <Link to="/">
            <Button variant="outline">Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-aroma py-14 sm:py-20">
      <Link
        to="/cart"
        className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-[#d4af37]"
      >
        <ArrowLeft size={14} />
        Back to Bag
      </Link>

      <div className="mt-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
          Secure Checkout
        </p>

        <h1 className="mt-3 text-4xl font-light sm:text-5xl">
          Complete Your Order
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
          Enter your delivery details and choose your preferred payment
          method to place your order.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Customer Form */}
        <form
          onSubmit={handleSubmit}
          className="border border-white/10 bg-[#111] p-6 sm:p-8"
        >
          <h2 className="text-2xl font-light">
            Delivery Details
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              ["name", "Full Name", "text", true],
              ["phone", "Phone Number", "tel", true],
              ["email", "Email Address", "email", true],
              ["pincode", "Pincode", "text", true],
              ["city", "City", "text", true],
              ["state", "State", "text", true],
            ].map(([field, label, type, required]) => (
              <label key={field} className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-widest text-gray-600">
                  {label}
                </span>

                <input
                  required={required}
                  type={type}
                  value={customer[field]}
                  onChange={(event) =>
                    update(field, event.target.value)
                  }
                  className="h-12 w-full border border-white/10 bg-[#0b0b0b] px-4 text-sm text-white outline-none transition-colors focus:border-[#d4af37]"
                />
              </label>
            ))}

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-[10px] uppercase tracking-widest text-gray-600">
                Delivery Address
              </span>

              <textarea
                required
                value={customer.address}
                onChange={(event) =>
                  update("address", event.target.value)
                }
                rows="4"
                placeholder="House / Flat, Street, Area"
                className="w-full resize-none border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-700 focus:border-[#d4af37]"
              />
            </label>
          </div>

          {/* Payment */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-light">
              Payment Method
            </h2>

            <div className="mt-5 grid gap-3">
              <label
                className={`flex cursor-pointer items-center gap-4 border p-5 transition-colors ${
                  paymentMethod === "cod"
                    ? "border-[#d4af37] bg-[#15120a]"
                    : "border-white/10 bg-[#0b0b0b] hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                  className="accent-[#d4af37]"
                />

                <Truck
                  size={20}
                  className="text-[#d4af37]"
                />

                <div>
                  <p className="text-sm text-white">
                    Cash on Delivery
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Pay when your order arrives.
                  </p>
                </div>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-4 border p-5 transition-colors ${
                  paymentMethod === "online"
                    ? "border-[#d4af37] bg-[#15120a]"
                    : "border-white/10 bg-[#0b0b0b] hover:border-white/25"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                  className="accent-[#d4af37]"
                />

                <CreditCard
                  size={20}
                  className="text-[#d4af37]"
                />

                <div>
                  <p className="text-sm text-white">
                    Online Payment
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Demo option for this project.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={18}
                className="text-[#d4af37]"
              />
              <span className="text-xs text-gray-500">
                Secure checkout
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Truck
                size={18}
                className="text-[#d4af37]"
              />
              <span className="text-xs text-gray-500">
                Delivery support
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                size={18}
                className="text-[#d4af37]"
              />
              <span className="text-xs text-gray-500">
                Address verified
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-8 w-full sm:w-auto"
            showArrow
          >
            Place Order
          </Button>

          <p className="mt-4 text-xs leading-5 text-gray-600">
            This demo checkout does not process real payments. Orders are
            stored locally in your browser for the project.
          </p>
        </form>

        {/* Order Summary */}
        <aside className="h-fit border border-white/10 bg-[#111] p-7 lg:sticky lg:top-28">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
            Your Order
          </p>

          <h2 className="mt-3 text-2xl font-light">
            Order Summary
          </h2>

          <div className="mt-7 space-y-5 border-b border-white/10 pb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {item.quantity} × {item.size}
                  </p>
                </div>

                <p className="text-sm">
                  ₹
                  {(item.price * item.quantity).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>
                ₹{cartSubtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span className="text-[#d4af37]">
                Free
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-lg">
            <span>Total</span>

            <span>
              ₹{cartSubtotal.toLocaleString("en-IN")}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;