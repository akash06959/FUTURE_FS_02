'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ShoppingBag } from 'lucide-react'

export default function OrderSuccess() {
  // 1. Force scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
        
        {/* Success Animation - Smooth Ease Out */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1], // Custom smooth bezier curve
            delay: 0.1 
          }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
          >
            <Check size={40} className="text-green-600" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Text Content - Staggered Fade In */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8">
            Thank you for your purchase. We&apos;ve sent a confirmation email with your order details.
          </p>

          {/* Order Info Box */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Order Number
              </span>
              <span className="text-sm font-mono font-bold text-gray-900">#882910</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Est. Delivery
              </span>
              <span className="text-sm font-bold text-gray-900">Nov 28 - Dec 01</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link href="/shop">
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-900 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95">
                <ShoppingBag size={18} />
                Continue Shopping
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-white text-gray-600 py-3 rounded-xl font-bold text-sm border border-gray-200 hover:bg-gray-50 transition-all">
                Return Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}