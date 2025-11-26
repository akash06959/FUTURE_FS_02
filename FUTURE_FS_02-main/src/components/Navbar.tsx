'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { cart } = useCart()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          E-Store
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-400">
            Shop
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
