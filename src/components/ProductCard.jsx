import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const liked = isInWishlist(product.id);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-[#121212]">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        {product.discount > 0 && (
          <span className="absolute left-3 top-3 bg-[#d4af37] px-2.5 py-1 text-[9px] font-semibold tracking-wider text-black">
            -{product.discount}%
          </span>
        )}

        <div className="absolute right-3 top-3">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
            className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all ${
              liked
                ? "border-[#d4af37] bg-[#d4af37] text-black"
                : "border-white/15 bg-black/40 text-white hover:border-[#d4af37] hover:text-[#d4af37]"
            }`}
          >
            <Heart
              size={16}
              fill={liked ? "currentColor" : "none"}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:opacity-100 ${
            inCart
              ? "bg-white text-black"
              : "bg-[#d4af37] text-black hover:bg-[#f1d77a]"
          }`}
        >
          {inCart ? <Check size={14} /> : <ShoppingBag size={14} />}
          {inCart ? "Added to Bag" : "Add to Bag"}
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block pt-5">
        <p className="text-[9px] uppercase tracking-[0.22em] text-[#d4af37]">
          {product.category} · {product.fragrance}
        </p>

        <h3 className="mt-2 text-base font-medium text-white transition-colors group-hover:text-[#d4af37]">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={12} fill="currentColor" className="text-[#d4af37]" />
            <span className="text-xs text-gray-400">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm font-medium text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="text-xs text-gray-600 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;