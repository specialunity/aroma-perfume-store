import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!cartItems.length) {
    return (
      <div className="container-aroma flex min-h-[70vh] flex-col items-center justify-center text-center">
        <ShoppingBag size={42} strokeWidth={1} className="text-[#d4af37]" />
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#d4af37]">Your bag</p>
        <h1 className="mt-3 text-4xl font-light">Your shopping bag is empty</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
          Discover a fragrance and add it to your bag to begin your order.
        </p>
        <Link to="/shop" className="mt-7"><Button showArrow>Explore Perfumes</Button></Link>
      </div>
    );
  }

  return (
    <div className="container-aroma py-14 sm:py-20">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">Your selection</p>
          <h1 className="mt-3 text-4xl font-light">Shopping Bag</h1>
        </div>
        <button onClick={clearCart} className="text-xs uppercase tracking-widest text-gray-600 hover:text-red-400">Clear Bag</button>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <motion.div layout key={item.id} className="grid gap-5 border border-white/10 bg-[#111] p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
              <Link to={`/product/${item.id}`} className="overflow-hidden">
                <img src={item.image} alt={item.name} className="aspect-square w-full object-cover" />
              </Link>

              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#d4af37]">{item.category} · {item.fragrance}</p>
                <Link to={`/product/${item.id}`} className="mt-2 block text-xl font-light hover:text-[#d4af37]">{item.name}</Link>
                <p className="mt-2 text-sm text-gray-600">{item.size}</p>
                <p className="mt-4 text-sm text-white">₹{item.price.toLocaleString("en-IN")}</p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center border border-white/10">
                    <button onClick={() => decreaseQuantity(item.id)} className="p-2 text-gray-500 hover:text-white"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="p-2 text-gray-500 hover:text-white"><Plus size={14} /></button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-400">
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="h-fit border border-white/10 bg-[#111] p-7 lg:sticky lg:top-28">
          <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">Order Summary</p>
          <h2 className="mt-3 text-2xl font-light">Your Order</h2>

          <div className="mt-7 space-y-4 border-b border-white/10 pb-6 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Items</span><span>{cartCount}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span><span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span><span className="text-[#d4af37]">Calculated at checkout</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between text-lg">
            <span>Total</span>
            <span>₹{cartSubtotal.toLocaleString("en-IN")}</span>
          </div>

          <Link to="/checkout" className="mt-7 block">
            <Button className="w-full" showArrow>Proceed to Checkout</Button>
          </Link>

          <Link to="/shop" className="mt-3 flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-white">
            Continue Shopping <ArrowRight size={13} />
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;