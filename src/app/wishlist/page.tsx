'use client'

import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { Trash2, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner' // ADDED: Import toast

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  // ADDED: Handler for notification on removal
  const handleRemove = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast.error(`Removed ${productName} from wishlist.`, { duration: 2000 });
  }

  // ADDED: Handler for moving to cart and notifying
  const handleAddToCartAndNotify = (product: any) => {
    addToCart(product);
    // Remove from wishlist (optional, but standard UX for "Move to Cart")
    removeFromWishlist(product.id); 
    toast.success(`Moved ${product.name} to cart!`, { duration: 2500 });
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-20 max-w-5xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Wishlist ({wishlist.length})</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg mb-4">Your wishlist is empty.</p>
          <Link href="/shop" className="text-indigo-600 font-semibold hover:underline">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all">
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button 
                  // UPDATED: Use handler
                  onClick={() => handleRemove(product.id, product.name)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <button 
                    // UPDATED: Use handler
                    onClick={() => handleAddToCartAndNotify(product)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}