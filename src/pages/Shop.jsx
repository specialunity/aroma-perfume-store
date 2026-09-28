import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Sparkles, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [fragrance, setFragrance] = useState(searchParams.get("fragrance") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Men", "Women", "Unisex"];
  const fragrances = ["All", ...new Set(products.map((p) => p.fragrance))];

  const sortOptions = [
    ["featured", "Featured"],
    ["newest", "Newest"],
    ["rating", "Highest Rated"],
    ["price-low", "Price: Low to High"],
    ["price-high", "Price: High to Low"],
    ["name", "Name: A to Z"],
  ];

  useEffect(() => {
    const params = {};
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (category !== "All") params.category = category;
    if (fragrance !== "All") params.fragrance = fragrance;
    if (sortBy !== "featured") params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [searchQuery, category, fragrance, sortBy, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    const search = searchQuery.trim().toLowerCase();

    if (search) {
      result = result.filter((p) =>
        [p.name, p.brand, p.category, p.fragrance, p.description]
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    }

    if (category !== "All") result = result.filter((p) => p.category === category);
    if (fragrance !== "All") result = result.filter((p) => p.fragrance === fragrance);

    if (sortBy === "newest") {
      result.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) =>
        ((b.isFeatured ? 3 : 0) + (b.isBestSeller ? 2 : 0) + (b.isNew ? 1 : 0)) -
        ((a.isFeatured ? 3 : 0) + (a.isBestSeller ? 2 : 0) + (a.isNew ? 1 : 0))
      );
    }

    return result;
  }, [searchQuery, category, fragrance, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setFragrance("All");
    setSortBy("featured");
  };

  const activeCount =
    (searchQuery ? 1 : 0) +
    (category !== "All" ? 1 : 0) +
    (fragrance !== "All" ? 1 : 0) +
    (sortBy !== "featured" ? 1 : 0);

  return (
    <div className="min-h-screen">
      <section className="border-b border-white/10">
        <div className="container-aroma py-16 sm:py-20">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">The Collection</p>
          <h1 className="mt-4 text-4xl font-light sm:text-6xl">
            Discover Your <span className="gold-gradient-text">Signature Scent</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500">
            Explore refined fragrances for every mood, occasion and personality.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
        <div className="container-aroma py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes, brands, fragrances..."
                className="h-12 w-full border border-white/10 bg-[#111] pl-12 pr-12 text-sm text-white outline-none focus:border-[#d4af37]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="flex h-11 items-center justify-center gap-2 border border-white/10 bg-[#111] px-4 text-xs uppercase tracking-widest text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <SlidersHorizontal size={15} /> Filters
                {activeCount > 0 && <span className="rounded-full bg-[#d4af37] px-1.5 text-[9px] text-black">{activeCount}</span>}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 w-52 appearance-none border border-white/10 bg-[#111] px-4 pr-10 text-xs text-gray-400 outline-none focus:border-[#d4af37]"
                >
                  {sortOptions.map(([value, label]) => (
                    <option key={value} value={value} className="bg-[#111]">{label}</option>
                  ))}
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 pt-6">
                  <p className="mb-3 text-[10px] uppercase tracking-widest text-gray-600">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((item) => (
                      <button
                        key={item}
                        onClick={() => setCategory(item)}
                        className={`border px-4 py-2 text-xs ${category === item ? "border-[#d4af37] bg-[#d4af37] text-black" : "border-white/10 text-gray-500 hover:text-white"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <p className="mb-3 mt-7 text-[10px] uppercase tracking-widest text-gray-600">Fragrance Family</p>
                  <div className="flex flex-wrap gap-2">
                    {fragrances.map((item) => (
                      <button
                        key={item}
                        onClick={() => setFragrance(item)}
                        className={`border px-3 py-2 text-xs ${fragrance === item ? "border-[#d4af37] bg-[#d4af37] text-black" : "border-white/10 text-gray-500 hover:text-white"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {activeCount > 0 && (
                    <button onClick={clearFilters} className="mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37]">
                      <RotateCcw size={13} /> Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="container-aroma">
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 border-b border-white/5 py-5">
            {category !== "All" && <span className="border border-white/10 px-3 py-1.5 text-xs text-gray-400">{category}</span>}
            {fragrance !== "All" && <span className="border border-white/10 px-3 py-1.5 text-xs text-gray-400">{fragrance}</span>}
            {searchQuery && <span className="border border-white/10 px-3 py-1.5 text-xs text-gray-400">"{searchQuery}"</span>}
            <button onClick={clearFilters} className="text-xs text-[#d4af37]">Clear all</button>
          </div>
        )}
      </div>

      <section className="container-aroma py-14 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#d4af37]">
              <Sparkles size={14} /> Our Collection
            </div>
            <h2 className="mt-3 text-3xl font-light">
              {category === "All" ? "All Fragrances" : `${category}'s Collection`}
            </h2>
          </div>
          <p className="text-sm text-gray-600">{filteredProducts.length} fragrances</p>
        </div>

        {filteredProducts.length ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex min-h-[350px] flex-col items-center justify-center border border-white/10 bg-[#111] text-center">
            <Search size={28} className="text-[#d4af37]" />
            <h3 className="mt-5 text-xl font-light">No fragrances found</h3>
            <p className="mt-3 max-w-md text-sm text-gray-600">Try changing your search or filters.</p>
            <Button variant="outline" className="mt-6" onClick={clearFilters}>Reset Filters</Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;