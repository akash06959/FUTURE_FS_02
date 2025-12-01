'use client'

import { Product } from '@/data/products'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()

  const isWishlisted = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleBuyNow = () => {
    addToCart(product)
    router.push('/checkout')
  }

  const colors = ['bg-black', 'bg-blue-800', 'bg-gray-400']
  const sizes = ['S', 'M', 'L', 'XL']

  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
      
      <Link href={`/product/${product.id}`} className="relative w-full sm:w-48 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-48 group">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        {product.price < 50 && (
          <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            DEAL
          </span>
        )}
      </Link>

      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div>
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"} 
                  className={i < Math.round(product.rating.rate) ? "text-amber-400" : "text-gray-200"} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {product.rating.count} sold
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-gray-400">Color</span>
            <div className="flex -space-x-1">
              {colors.map((c, i) => (
                <div key={i} className={`w-4 h-4 rounded-full border border-white shadow-sm ${c}`} />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-gray-400">Size</span>
            <div className="flex gap-1">
              {sizes.map((s) => (
                <span key={s} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-green-600 font-medium pt-2 border-t border-gray-50 mt-2">
           <span className="font-bold">Free Delivery</span> by Nov 24
        </div>
      </div>

      <div className="w-full sm:w-40 flex-shrink-0 flex flex-col justify-between sm:border-l sm:border-gray-100 sm:pl-6 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
         <div>
            <div className="flex items-baseline gap-1">
                <span className="text-xs font-medium text-gray-500">$</span>
                <span className="text-2xl font-bold text-gray-900">{Math.floor(product.price)}</span>
                <span className="text-xs font-medium text-gray-700">.{product.price.toFixed(2).split('.')[1]}</span>
            </div>
            <p className="text-[10px] text-gray-400">Includes taxes</p>
         </div>

         <div className="flex flex-col gap-2 mt-3">
        <button
              onClick={() => addToCart(product)}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-[#FCD200] py-2 rounded-full text-xs font-bold shadow-sm transition-colors"
        >
          Add to Cart
        </button>
            <button 
              onClick={handleBuyNow}
              className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black border border-[#FF8F00] py-2 rounded-full text-xs font-bold shadow-sm transition-colors"
            >
              Buy Now
            </button>
            
            <button 
              onClick={toggleWishlist}
              className={`flex items-center justify-center gap-2 text-sm transition-colors py-1 ${
                isWishlisted ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'
              }`}
            >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} /> 
                <span className="font-medium">{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
         </div>
      </div>
    </div>
  )
}
