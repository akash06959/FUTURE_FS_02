'use client'

import { motion } from 'framer-motion'
import Link from "next/link";
import { ArrowRight } from 'lucide-react'

import HeroCarousel from '@/components/HeroCarousel'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGridCard from "@/components/ProductGridCard";

import { products } from "@/data/products";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function Home() {
  // Custom selection for Trending products
  // Replacing the first item (Casual Tees) with Leather Purse (id: 9)
  const trendingProducts = [
    products.find(p => p.id === 9) || products[0], // Leather Purse
    ...products.slice(1, 4) // Keeps Denim Jeans, Sneakers, Men's Watches
  ];

  return (
    <main className="bg-white min-h-screen">
      <HeroCarousel />

      <CategoryGrid />

      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                Trending Now
              </h2>
              <p className="text-slate-500 font-medium">
                Top picks tailored for you this week.
              </p>
            </div>
            
            <Link href="/shop" className="group flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full transition-all hover:bg-indigo-100">
              View all products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {trendingProducts.map((product) => (
              <motion.div key={product.id} variants={sectionVariants}>
                <ProductGridCard product={product} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

    </main>
  );
}