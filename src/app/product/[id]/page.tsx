'use client'

import { useState } from 'react'
import { products } from "@/data/products";
import { useCart } from '@/context/CartContext'
import { Star, Heart, Share2, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const router = useRouter()
  
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) return <div className="min-h-[50vh] flex items-center justify-center">Product not found</div>;

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  
  const availableColors = product?.colorImages ? Object.keys(product.colorImages) : []
  
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || '')
  
  const [selectedImage, setSelectedImage] = useState(
    (product?.colorImages && product.colorImages[availableColors[0]]) || product?.image || ''
  )
  
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description')

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addToCart(product, quantity)
    alert(`Added ${quantity} ${product.name} (${selectedColor}, ${selectedSize})`) 
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push('/checkout')
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    if (product.colorImages && product.colorImages[color]) {
      setSelectedImage(product.colorImages[color])
    }
  }

  const getColorClass = (colorName: string) => {
    const map: Record<string, string> = {
      'White': 'bg-white border-gray-200',
      'Black': 'bg-black border-black',
      'Navy': 'bg-blue-900 border-blue-900',
      'Blue': 'bg-blue-600 border-blue-600',
      'Red': 'bg-red-600 border-red-600',
      'Grey': 'bg-gray-500 border-gray-500',
      'Silver': 'bg-gray-300 border-gray-300',
      'Gold': 'bg-yellow-500 border-yellow-500',
      'Tan': 'bg-amber-200 border-amber-200',
      'Brown': 'bg-amber-800 border-amber-800',
      'Pink': 'bg-pink-400 border-pink-400',
      'Light Blue': 'bg-sky-300 border-sky-300',
      'Green': 'bg-green-600 border-green-600'
    }
    return map[colorName] || 'bg-gray-200 border-gray-200'
  }

  return (
    // FIX 1: Added 'mt-20' here to push content below the fixed navbar
    <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
        
        <div className="mb-6">
            <Link 
              href="/shop" 
              // FIX 2: Added button styles (white bg, border, rounded-full, shadow, hover effect)
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-full shadow-sm hover:bg-gray-50 hover:text-black hover:shadow-md transition-all active:scale-95"
            >
                <ArrowLeft size={16} /> Back to Shop
            </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-[2rem] p-6 lg:p-10 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                
                {/* --- IMAGE SECTION --- */}
                <div>
                    {/* UPDATED: max-w-[400px] constrains the image width */}
                    <div className="relative aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-inner border border-gray-100 mx-auto max-w-[400px]">
                        <img 
                          src={selectedImage}
                          alt={product.name} 
                          // Includes mobile optimization (contain) and desktop (cover)
                          className="w-full h-full object-contain lg:object-cover transition-opacity duration-300"
                        />
                        <button className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>

                {/* --- PRODUCT DETAILS SECTION --- */}
                <div className="flex flex-col">
                    <span className="text-sm text-indigo-600 font-bold tracking-wider uppercase mb-2">
                      {product.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-4 mb-6 text-sm">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (<Star key={i} size={16} fill="currentColor" />))}
                        </div>
                        <span className="text-indigo-600 font-medium hover:underline cursor-pointer">{product.rating.count} reviews</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-green-600 font-bold">In Stock</span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-6">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="h-px bg-gray-100 w-full mb-8"></div>

                    <div className="space-y-6 mb-8">
                        <div>
                            <span className="text-sm font-bold text-gray-900 mb-3 block">Color: <span className="font-normal text-gray-500">{selectedColor}</span></span>
                            <div className="flex gap-3">
                                {availableColors.map((colorName) => (
                                    <button 
                                        key={colorName}
                                        onClick={() => handleColorSelect(colorName)}
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getColorClass(colorName)} ${selectedColor === colorName ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                                        title={colorName}
                                    >
                                        {selectedColor === colorName && <Check size={16} className={['White', 'Silver', 'Tan', 'Light Blue'].includes(colorName) ? 'text-black' : 'text-white'} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-3">
                                <span className="text-sm font-bold text-gray-900">Size: <span className="font-normal text-gray-500">{selectedSize}</span></span>
                                <span className="text-xs font-bold text-indigo-600 underline cursor-pointer">Size Chart</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((s) => (
                                    <button 
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`w-12 h-10 rounded-lg text-sm font-bold border transition-all ${
                                            selectedSize === s ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="inline-flex items-center border border-gray-300 rounded-full h-14 w-full sm:w-32">
                            <button onClick={decrement} className="w-10 h-full flex items-center justify-center hover:bg-gray-100 rounded-l-full disabled:opacity-50" disabled={quantity <= 1}><Minus size={16}/></button>
                            <span className="flex-1 text-center font-bold text-gray-900">{quantity}</span>
                            <button onClick={increment} className="w-10 h-full flex items-center justify-center hover:bg-gray-100 rounded-r-full"><Plus size={16}/></button>
                        </div>
                        <button onClick={handleAddToCart} className="flex-1 bg-black text-white h-14 rounded-full font-bold text-base hover:bg-gray-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"><ShoppingBag size={20} /> Add to Cart</button>
                        <button onClick={handleBuyNow} className="flex-1 bg-indigo-600 text-white h-14 rounded-full font-bold text-base hover:bg-indigo-700 transition-all shadow-lg active:scale-95">Buy Now</button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2"><Truck size={18} className="text-gray-900"/> Free delivery over $100</div>
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-gray-900"/> 2 Year Warranty</div>
                        <div className="flex items-center gap-2"><Share2 size={18} className="text-gray-900"/> 30 Day Returns</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
                <div className="border-b border-gray-200">
                    <div className="flex gap-8">
                        {(['description', 'reviews', 'shipping'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${
                                    activeTab === tab 
                                    ? 'border-black text-black' 
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                    {activeTab === 'description' && (
                        <div>
                            <p>{product.description}</p>
                            <p className="mt-4">Constructed from our signature high-performance fabric, this item is designed to withstand the rigors of daily life while keeping you looking sharp.</p>
                            <ul className="list-disc pl-5 space-y-1 mt-4">
                                <li>Premium cotton blend material</li>
                                <li>Machine washable (cold wash)</li>
                                <li>Fits true to size</li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="pt-4">
                            <h3 className="font-bold text-xl mb-6">Customer Reviews</h3>
                            <div className="space-y-6">
                                {[1, 2].map((i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                                <span className="font-bold text-sm">Alex Doe</span>
                                            </div>
                                            <div className="flex text-amber-400"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                                        </div>
                                        <p className="text-sm text-gray-600">"Absolutely love the quality! It fits perfectly."</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'shipping' && (
                        <div>
                            <p>We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $5.99 applies.</p>
                            <p className="mt-4">Orders are typically processed within 1-2 business days. Standard shipping takes 3-5 business days.</p>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl mb-6">You Might Also Like</h3>
                <div className="flex flex-col gap-6">
                    {relatedProducts.map((p) => (
                        <div key={p.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">{p.name}</h4>
                                <p className="text-gray-500 text-xs mb-1">{p.category}</p>
                                <p className="font-bold text-sm">${p.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
}