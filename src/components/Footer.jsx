import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="container-aroma py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="text-2xl font-semibold tracking-[0.3em] text-white"
            >
              AROMA
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-500">
              Discover fragrances that become a part of your identity.
              Carefully selected scents for every mood and moment.
            </p>

            <div className="mt-7 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-white/10 text-xs text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]">IG</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-white/10 text-xs text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]">FB</a>
              <a href="mailto:hello@aromaperfume.com" className="flex h-10 w-10 items-center justify-center border border-white/10 text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]"><Mail size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">Explore</h3>
            <ul className="mt-6 space-y-4 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white">Shop All</Link></li>
              <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white">Shopping Bag</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">Information</h3>
            <ul className="mt-6 space-y-4 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-white">About AROMA</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/shop" className="hover:text-white">Fragrance Collection</Link></li>
              <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">Contact</h3>
            <div className="mt-6 space-y-5 text-sm text-gray-500">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#d4af37]" />
                <p>Delhi NCR<br />India</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-[#d4af37]" />
                <a href="tel:+910000000000" className="hover:text-white">+91 00000 00000</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-[#d4af37]" />
                <a href="mailto:hello@aromaperfume.com" className="hover:text-white">hello@aromaperfume.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-aroma flex flex-col items-center justify-between gap-5 py-6 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} AROMA PERFUME STORE. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500 hover:text-[#d4af37]"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center border border-white/10 group-hover:border-[#d4af37]">
              <ArrowUp size={14} className="group-hover:-translate-y-1" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;