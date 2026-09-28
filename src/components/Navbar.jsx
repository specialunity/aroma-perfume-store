import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    Search,
    Heart,
    ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import logo from "../assets/logo.png";
function Navbar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        if (search.trim()) {
            navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
            setSearch("");
            setOpen(false);
        }
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl">
            <div className="container-aroma flex h-20 items-center justify-between gap-5">
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        alt="AROMA Perfume Store"
                        className="h-13 w-auto object-contain"
                    />
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => {
                        const active =
                            item.path === "/"
                                ? location.pathname === "/"
                                : location.pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative py-2 text-xs uppercase tracking-[0.18em] transition-colors ${active ? "text-[#d4af37]" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {item.label}
                                {active && (
                                    <span className="absolute bottom-0 left-0 right-0 h-px bg-[#d4af37]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-4 md:flex">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="w-36 border-b border-white/15 bg-transparent py-2 pl-1 pr-8 text-xs text-white outline-none placeholder:text-gray-600 focus:border-[#d4af37]"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d4af37]"
                            aria-label="Search"
                        >
                            <Search size={17} strokeWidth={1.5} />
                        </button>
                    </form>

                    <Link
                        to="/wishlist"
                        className="relative text-gray-400 transition-colors hover:text-[#d4af37]"
                        aria-label="Wishlist"
                    >
                        <Heart size={19} strokeWidth={1.5} />
                        {wishlistCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[9px] font-bold text-black">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/cart"
                        className="relative text-gray-400 transition-colors hover:text-[#d4af37]"
                        aria-label="Shopping bag"
                    >
                        <ShoppingBag size={19} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[9px] font-bold text-black">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <Link to="/cart" className="relative text-gray-300">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[9px] font-bold text-black">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        className="text-gray-300"
                        aria-label="Open menu"
                    >
                        {open ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-[#0b0b0b] px-5 py-6 md:hidden">
                    <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search perfumes..."
                            className="min-w-0 flex-1 border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none focus:border-[#d4af37]"
                        />
                        <button
                            type="submit"
                            className="border border-[#d4af37] px-4 text-[#d4af37]"
                        >
                            <Search size={18} />
                        </button>
                    </form>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className="block border-b border-white/5 py-4 text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-[#d4af37]"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            to="/wishlist"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between border-b border-white/5 py-4 text-xs uppercase tracking-[0.2em] text-gray-300"
                        >
                            Wishlist
                            {wishlistCount > 0 && (
                                <span className="text-[#d4af37]">{wishlistCount}</span>
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between py-4 text-xs uppercase tracking-[0.2em] text-gray-300"
                        >
                            Shopping Bag
                            {cartCount > 0 && (
                                <span className="text-[#d4af37]">{cartCount}</span>
                            )}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;