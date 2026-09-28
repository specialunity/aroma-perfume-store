import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

function Home() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  const categories = [
    {
      name: "Men",
      description: "Bold. Refined. Unforgettable.",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85",
    },
    {
      name: "Women",
      description: "Elegant. Soft. Captivating.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85",
    },
    {
      name: "Unisex",
      description: "Versatile scents for everyone.",
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=85",
    },
  ];

  const reviews = [
    { name: "Aarav Mehta", text: "The fragrance feels premium and lasts beautifully. The packaging is also gorgeous.", rating: 5 },
    { name: "Riya Sharma", text: "Golden Bloom has become one of my favourite everyday perfumes. Absolutely elegant.", rating: 5 },
    { name: "Kabir Singh", text: "Great collection and the ordering process is simple. Midnight Oud is fantastic.", rating: 5 },
  ];

  return (
    <div>
      <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury perfume"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20" />

        <div className="container-aroma relative py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#d4af37]">
              AROMA PERFUME STORE
            </p>

            <h1 className="text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-8xl">
              Lift Up
              <span className="block gold-gradient-text">Your Mood</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Discover carefully selected fragrances designed to become part of
              your story. Luxury, character and elegance in every bottle.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/shop">
                <Button showArrow>Explore Collection</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline">Our Story</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <a
          href="#featured"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-[#d4af37]"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </section>

      <section className="border-b border-white/10 bg-[#0b0b0b]">
        <div className="container-aroma py-16 text-center sm:py-20">
          <Sparkles size={18} className="mx-auto text-[#d4af37]" />
          <p className="mx-auto mt-5 max-w-3xl text-lg font-light leading-8 text-gray-300 sm:text-2xl">
            "Your fragrance says something about you before you say a word."
          </p>
        </div>
      </section>

      <section id="featured" className="container-aroma py-20 sm:py-24">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Curated for you</p>
            <h2 className="mt-3 text-3xl font-light sm:text-4xl">Featured Fragrances</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#d4af37] sm:flex">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d]">
        <div className="container-aroma py-20">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Find yours</p>
            <h2 className="mt-3 text-3xl font-light sm:text-4xl">Shop By Collection</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/shop?category=${category.name}`}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[4/5]">
                  <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="text-[10px] text-[#d4af37]">0{index + 1}</span>
                  <h3 className="mt-2 text-2xl font-light">{category.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-aroma py-20 sm:py-24">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Loved by many</p>
            <h2 className="mt-3 text-3xl font-light sm:text-4xl">Best Sellers</h2>
          </div>
          <Link to="/shop?sort=rating" className="hidden items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#d4af37] sm:flex">
            Explore <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="border-y border-[#d4af37]/20 bg-[#15120a]">
        <div className="container-aroma flex flex-col items-center justify-between gap-8 py-14 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">Limited Offer</p>
            <h2 className="mt-3 text-3xl font-light">Up to 17% Off Selected Fragrances</h2>
            <p className="mt-3 text-sm text-gray-500">Find your next signature scent at a special price.</p>
          </div>
          <Link to="/shop">
            <Button showArrow>Shop Offers</Button>
          </Link>
        </div>
      </section>

      <section className="container-aroma py-20 sm:py-24">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Just arrived</p>
          <h2 className="mt-3 text-3xl font-light sm:text-4xl">New Arrivals</h2>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d]">
        <div className="container-aroma grid gap-12 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">The AROMA story</p>
            <h2 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
              Crafted for moments
              <span className="block text-gray-500">you never forget.</span>
            </h2>
          </div>

          <div>
            <p className="text-sm leading-8 text-gray-500">
              AROMA was created around a simple idea: fragrance should feel
              personal. Our collection combines familiar ingredients with
              modern compositions to create scents that can become part of
              everyday memories.
            </p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37]">
              Discover Our Story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-aroma py-20">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Customer notes</p>
          <h2 className="mt-3 text-3xl font-light">What People Say</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="border border-white/10 bg-[#111] p-7">
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" className="text-[#d4af37]" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-gray-400">"{review.text}"</p>
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white">{review.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;