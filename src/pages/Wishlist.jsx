import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

function Wishlist() {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistItems.length) {
    return (
      <div className="container-aroma flex min-h-[70vh] flex-col items-center justify-center text-center">
        <Heart size={42} strokeWidth={1} className="text-[#d4af37]" />
        <p className="mt-6 text-xs uppercase tracking-widest text-[#d4af37]">Saved fragrances</p>
        <h1 className="mt-3 text-4xl font-light">Your wishlist is empty</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
          Save fragrances you love and come back to them whenever you like.
        </p>
        <Link to="/shop" className="mt-7"><Button>Explore Collection</Button></Link>
      </div>
    );
  }

  return (
    <div className="container-aroma py-14 sm:py-20">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">Saved for later</p>
          <h1 className="mt-3 text-4xl font-light">Wishlist</h1>
        </div>
        <button onClick={clearWishlist} className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 hover:text-red-400">
          <Trash2 size={14} /> Clear Wishlist
        </button>
      </div>

      <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <button
              onClick={() => addToCart(product)}
              className="mt-4 flex w-full items-center justify-center gap-2 border border-white/10 py-3 text-xs uppercase tracking-widest text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;