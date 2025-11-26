'use client'

import { useState, useMemo } from 'react'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'

export default function Shop() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [price, setPrice] = useState(1000)

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
    return uniqueCategories.sort()
  }, [])

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    let newCategories: string[]
    if (isChecked) {
      newCategories = [...selectedCategories, category]
    } else {
      newCategories = selectedCategories.filter((c) => c !== category)
    }
    setSelectedCategories(newCategories)
    filter(newCategories, price, searchQuery)
  }

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice)
    filter(selectedCategories, newPrice, searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
    filter(selectedCategories, price, newSearchQuery)
  }

  const filter = (categories: string[], price: number, query: string) => {
    let newFilteredProducts = products

    if (categories.length > 0) {
      newFilteredProducts = newFilteredProducts.filter((p) =>
        categories.includes(p.category)
      )
    }

    if (price < 1000) {
      newFilteredProducts = newFilteredProducts.filter((p) => p.price <= price)
    }

    if (query) {
      newFilteredProducts = newFilteredProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    }

    setFilteredProducts(newFilteredProducts)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Shop</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-md px-4 py-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <FilterSidebar
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
          />
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
