'use client'

import { useState, useEffect, ChangeEvent, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { products, Product } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { Filter, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type GenderTab = 'Men' | 'Women'

function ShopContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // --- STATE ---
  const [activeGender, setActiveGender] = useState<GenderTab>('Men')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [price, setPrice] = useState(1000)
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['Shirts', 'Jeans', 'Accessories', 'Shoes']

  // --- FILTER LOGIC ---
  const runFilter = (
    gender: GenderTab,
    cats: string[],
    priceLimit: number,
    query: string
  ) => {
    let result = products.filter((p) => p.gender === gender)

    if (cats.length > 0) {
      result = result.filter((p) => cats.includes(p.category))
    }

    result = result.filter((p) => p.price <= priceLimit)

    if (query) {
      result = result.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    }

    setFilteredProducts(result)
  }

  // --- INITIAL LOAD ---
  useEffect(() => {
    const urlCategory = searchParams.get('category')
    const urlGender = searchParams.get('gender')

    let currentGender = activeGender
    if (urlGender === 'Men' || urlGender === 'Women') {
      currentGender = urlGender as GenderTab
      setActiveGender(currentGender)
    }
    
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategories([urlCategory])
      setShowFilters(true)
      runFilter(currentGender, [urlCategory], price, searchQuery)
    } else {
      runFilter(currentGender, selectedCategories, price, searchQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]) 

  // --- HANDLERS ---
  const handleGenderChange = (gender: GenderTab) => {
    setActiveGender(gender)
    runFilter(gender, selectedCategories, price, searchQuery)
  }

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    const newCats = isChecked 
      ? [...selectedCategories, category] 
      : selectedCategories.filter(c => c !== category)
    
    setSelectedCategories(newCats)
    runFilter(activeGender, newCats, price, searchQuery)
  }

  const handlePriceChange = (val: string) => {
    const p = Number(val)
    setPrice(p)
    runFilter(activeGender, selectedCategories, p, searchQuery)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setSearchQuery(q)
    runFilter(activeGender, selectedCategories, price, q)
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 mt-20 min-h-screen">
      
      {/* --- 1. SMOOTH GENDER TABS --- */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex relative bg-gray-100 p-1.5 rounded-full shadow-inner">
          {['Men', 'Women'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleGenderChange(tab as GenderTab)}
              className={`relative z-10 px-10 py-3 text-sm font-bold transition-colors duration-300 ${
                activeGender === tab ? 'text-black' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {activeGender === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-20">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- 2. HEADER & CONTROLS --- */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <motion.h1 
            key={activeGender}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold tracking-tight text-gray-900"
          >
            {activeGender}'s Collection
          </motion.h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} items found
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all active:scale-95 ${
              showFilters
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {showFilters ? <X size={18} /> : <Filter size={18} />}
            <span>{showFilters ? 'Close' : 'Filters'}</span>
          </button>
          
          <div className="relative w-full sm:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400 group-focus-within:text-black transition-colors"/>
            </div>
            <input
              type="text"
              placeholder={`Search ${activeGender}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-full w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
        </div>
      </div>

      {/* --- 3. MAIN LAYOUT --- */}
      <div className="flex items-start gap-8">
        
        {/* OPTION A: MOBILE FILTER DRAWER (Visible only on Mobile) */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 bottom-0 z-50 w-3/4 max-w-xs bg-white p-6 shadow-2xl overflow-y-auto lg:hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  price={price}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* OPTION B: DESKTOP SIDEBAR (Visible only on Desktop) */}
        {/* The 'hidden lg:block' classes ensure this DOM doesn't interfere with mobile */}
        <motion.div
          initial={false}
          animate={{ 
            width: showFilters ? 256 : 0, 
            opacity: showFilters ? 1 : 0,
            marginRight: showFilters ? 16 : 0 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-shrink-0 overflow-hidden hidden lg:block"
        >
          <div className="w-64 pt-1">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              price={price}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
            />
          </div>
        </motion.div>

        {/* Product List (Animated) */}
        <div className="min-w-0 flex-1">
          <motion.div layout className="flex flex-col gap-4">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-32 text-center"
                >
                  <p className="text-lg text-gray-500">No products found.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategories([])
                      setPrice(1000)
                      runFilter(activeGender, [], 1000, '')
                    }}
                    className="mt-2 font-medium text-indigo-600 hover:underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-gray-400">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  )
}
