'use client'

import { useCart } from '@/context/CartContext'
import { Product } from '@/data/products'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    alert("Added to cart!")
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center justify-between">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      </Link>
      <p className="text-gray-500 mb-2">{product.category}</p>
      <div className="flex items-center mb-2">
          <p className="text-yellow-500">{product.rating.rate} ({product.rating.count} reviews)</p>
      </div>
      <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <Link href={`/product/${product.id}`} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
          View Details
        </Link>
      </div>
    </div>
  )
}
