'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart,
  Search,
  Sparkles,
  Heart,
  Menu,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

export default function Navbar() {
  const router = useRouter()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50'
            : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Apparel Store
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="hover:text-indigo-600 transition-colors">
              Shop
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essentials..."
              // Added subtle border so search is visible on white background
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 focus:bg-white focus:border-indigo-500 rounded-full text-sm transition-all shadow-sm focus:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </form>

          <div className="flex items-center gap-4 sm:gap-6">
            
            <Link href="/wishlist" className="relative group text-slate-600 hover:text-rose-500 transition-colors">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Heart size={24} strokeWidth={2} />
              </motion.div>
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link href="/cart" className="relative group text-slate-600 hover:text-indigo-600 transition-colors">
              <motion.div whileTap={{ scale: 0.9 }}>
                <ShoppingCart size={24} strokeWidth={2} />
              </motion.div>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button 
              className="md:hidden text-slate-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/shop" className="hidden sm:block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-lg shadow-indigo-500/30"
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-xl z-40 md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <Link href="/" className="text-lg font-medium text-slate-800 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/shop" className="text-lg font-medium text-slate-800 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link href="/wishlist" className="text-lg font-medium text-slate-800 py-2 flex justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                Wishlist <span className="text-rose-500 font-bold">{wishlist.length}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}