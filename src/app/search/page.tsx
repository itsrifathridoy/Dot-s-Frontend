// filepath: /Users/Sabit/Projects/Dot-s-Frontend/src/app/search/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products"; // adjust if data path differs

interface ProductItem {
  id: number;
  slug: string;
  image: string;
  title: string;
  description: string;
  reviews: number;
  price: string; // stored as string in data
  category: string;
}

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = (searchParams.get("q") || "").trim();
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isTyping, setIsTyping] = useState(false);

  // Derived filtered results
  const results: ProductItem[] = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Debounce user input -> update URL & query state
  useEffect(() => {
    setIsTyping(true);
    const h = setTimeout(() => {
      const newQ = inputValue.trim();
      setQuery(newQ);
      const params = new URLSearchParams(window.location.search);
      if (newQ) {
        params.set("q", newQ);
      } else {
        params.delete("q");
      }
      router.replace(`/search${params.toString() ? `?${params.toString()}` : ""}`);
      setIsTyping(false);
    }, 300);
    return () => clearTimeout(h);
  }, [inputValue, router]);

  // Keep input in sync if user navigates via back/forward
  useEffect(() => {
    const current = (searchParams.get("q") || "").trim();
    setInputValue(current);
    setQuery(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValue(inputValue.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search products (e.g. Sofa, Bed, Table)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-12 pr-16 py-4 rounded-2xl border-2 border-gray-200 bg-white/70 backdrop-blur focus:border-[#7A1315] focus:ring-2 focus:ring-[#7A1315]/20 transition text-gray-900 text-base sm:text-lg"
              autoFocus
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#7A1315] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue("")}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#7A1315] to-[#a11618] text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition"
            >
              Search
            </button>
          </div>
          {/* Suggested quick terms */}
          {!inputValue && (
            <div className="mt-4 flex flex-wrap gap-2">
              {["Sofa", "Chair", "Bed", "Table", "Ottoman"].map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setInputValue(term)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition"
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Status / Messages */}
        <div className="mb-4 min-h-[1.5rem] text-sm text-gray-600 flex items-center">
          {isTyping && <span className="animate-pulse">Searching...</span>}
          {!isTyping && query && (
            <span>
              {results.length} result{results.length !== 1 && "s"} for "<strong>{query}</strong>"
            </span>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {query ? (
            results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {results.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group bg-white/80 backdrop-blur rounded-2xl shadow-sm hover:shadow-xl border border-gray-200/70 hover:border-[#7A1315]/40 overflow-hidden flex flex-col"
                  >
                    <Link href={`/products/${p.slug}`} className="block">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
                        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur px-2 py-0.5 rounded-md text-xs font-medium text-gray-700">
                          {p.category}
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-[#7A1315] transition-colors">{p.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3 hidden sm:block">{p.description}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-[#7A1315] font-bold text-sm sm:text-base">
                            ৳{parseInt(p.price).toLocaleString()} BDT
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {p.reviews}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              !isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">We couldn\'t find any products matching "{query}". Try different keywords or explore popular categories.</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["Sofa", "Dining", "Bed", "Chair", "Storage"].map(term => (
                      <button
                        key={term}
                        onClick={() => setInputValue(term)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 font-medium transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7A1315]/10 to-[#a11618]/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#7A1315]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Start your search</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-6">Find the perfect furniture for every room. Try searching by product type, category or style.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Modern Sofa", "King Bed", "Coffee Table", "Office Chair", "Wardrobe"].map(term => (
                  <button
                    key={term}
                    onClick={() => setInputValue(term)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 font-medium transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;
