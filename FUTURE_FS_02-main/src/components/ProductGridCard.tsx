'use client'

import { Product } from '@/data/products'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function ProductGridCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="group relative flex flex-col gap-3">
      <Link href={`/product/${product.id}`} className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white"
          title="Add to Cart"
        >
          <ShoppingBag size={20} />
        </button>
      </Link>

      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="font-bold text-gray-900 mt-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}