'use client';

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

const checkoutSteps = ['Cart', 'Details', 'Payment', 'Done']

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 150 ? 0 : 12
  const tax = subtotal * 0.08
  const total = subtotal + tax + shipping

  if (cart.length === 0) {
    return (
      // Added mt-20 here
      <div className="container mt-20 py-16">
        <div className="glass-panel flex flex-col items-center rounded-3xl p-12 text-center">
          <div className="mb-6 rounded-full bg-brand-50 p-6 text-brand-600">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="font-serif text-3xl text-ink">Your bag is feeling light</h1>
          <p className="mt-2 max-w-md text-slate-500">
            Discover new arrivals and exclusive drops curated by our stylists.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-500"
          >
            Start shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    // Added mt-20 here
    <div className="container mt-20 py-12">
      <div className="mb-8 grid gap-3 md:grid-cols-4">
        {checkoutSteps.map((step, index) => {
          const isActive = index === 0
          return (
            <div
              key={step}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
                isActive
                  ? 'border-brand-200 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-400'
              }`}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
                {index + 1}
              </span>
              {step}
            </div>
          )
        })}
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{item.name}</h2>
                    <p className="text-sm text-slate-500">{item.category}</p>
                    <p className="mt-2 font-semibold text-ink">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center rounded-full border border-slate-200 bg-white px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-slate-500 transition hover:text-brand-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-slate-500 transition hover:text-brand-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-red-100 px-3 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="space-y-6 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink">Cart summary</h2>
              <span className="text-sm text-slate-500">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-semibold text-ink">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-500"
            >
              Continue to checkout
            </Link>
            <div className="grid gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-100 px-3 py-2">
                <Truck className="h-4 w-4 text-brand-600" />
                Free express shipping over $150
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-100 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                1-year coverage on every item
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}