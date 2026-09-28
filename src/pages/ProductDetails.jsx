import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star, Check, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const related = useMemo(
    () => products.filter((p) => p.id !== product?.id && p.category === product?.category).slice(0, 4),
    [product]
  );

  if (!product) {
    return (
      <div className="container-aroma flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-widest text-[#d4af37]">404</p>
        <h1 className="mt-4 text-4xl font-light">Fragrance not found</h1>
        <Link to="/shop" className="mt-7"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const liked = isInWishlist(product.id);

  return (
    <div>
      <section className="container-aroma py-10 sm:py-16">
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-[#d4af37]">
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="overflow-hidden bg-[#111]">
              <img src={product.image} alt={product.name} className="aspect-square h-full w-full object-cover" />
            </div>
            {product.discount > 0 && (
              <span className="absolute left-4 top-4 bg-[#d4af37] px-3 py-1.5 text-xs font-semibold text-black">-{product.discount}%</span>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">{product.category} · {product.fragrance}</p>
            <h1 className="mt-4 text-4xl font-light sm:text-5xl">{product.name}</h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className={i < Math.round(product.rating) ? "text-[#d4af37]" : "text-gray-700"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} · {product.reviews} reviews</span>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-2xl text-white">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-gray-600 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            </div>

            <p className="mt-7 text-sm leading-8 text-gray-500">{product.description}</p>

            <div className="mt-8 grid grid-cols-3 border-y border-white/10 py-5">
              <div><p className="text-[9px] uppercase tracking-widest text-gray-600">Size</p><p className="mt-2 text-sm">{product.size}</p></div>
              <div><p className="text-[9px] uppercase tracking-widest text-gray-600">Family</p><p className="mt-2 text-sm">{product.fragrance}</p></div>
              <div><p className="text-[9px] uppercase tracking-widest text-gray-600">Type</p><p className="mt-2 text-sm">{product.category}</p></div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <Button onClick={() => addToCart(product)} showArrow>
                {inCart ? "Add Another" : "Add to Bag"}
              </Button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`flex h-12 items-center justify-center border px-5 ${liked ? "border-[#d4af37] bg-[#d4af37] text-black" : "border-white/15 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37]"}`}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>

            {inCart && (
              <Link to="/cart" className="mt-3 flex items-center justify-center gap-2 border border-white/10 py-3 text-xs uppercase tracking-widest text-gray-400 hover:text-white">
                <Check size={14} /> View Shopping Bag
              </Link>
            )}

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3"><Truck size={18} className="text-[#d4af37]" /><span className="text-xs text-gray-500">Fast delivery</span></div>
              <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-[#d4af37]" /><span className="text-xs text-gray-500">Secure order</span></div>
              <div className="flex items-center gap-3"><Sparkles size={18} className="text-[#d4af37]" /><span className="text-xs text-gray-500">Premium scent</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d]">
        <div className="container-aroma py-16">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">The composition</p>
            <h2 className="mt-3 text-3xl font-light">Fragrance Notes</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Top Notes", product.notes.top],
              ["Heart Notes", product.notes.middle],
              ["Base Notes", product.notes.base],
            ].map(([title, text]) => (
              <div key={title} className="border border-white/10 bg-[#111] p-7">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37]">{title}</span>
                <p className="mt-4 text-lg font-light text-white">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-aroma py-20">
          <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">You may also like</p>
          <h2 className="mt-3 text-3xl font-light">More from the collection</h2>
          <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;