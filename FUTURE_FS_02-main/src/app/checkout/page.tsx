'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { CreditCard, ShieldCheck, Check, ArrowRight, ShoppingBag } from 'lucide-react'

interface FormErrors {
  name?: string
  email?: string
  address?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

const checkoutSteps = ['Cart', 'Details', 'Payment', 'Done']

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validateCardNumber = (cardNumber: string) =>
    /^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''))
  const validateExpiryDate = (expiryDate: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)
  const validateCVV = (cvv: string) => /^\d{3,4}$/.test(cvv)

  const formatCardNumber = (value: string) =>
    value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiryDate = (value: string) =>
    value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .slice(0, 5)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') formattedValue = formatCardNumber(value)
    else if (name === 'expiryDate') formattedValue = formatExpiryDate(value)
    else if (name === 'cvv') formattedValue = value.replace(/\D/g, '').slice(0, 4)

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim() || !validateEmail(formData.email))
      newErrors.email = 'Valid email required'
    if (!formData.address.trim()) newErrors.address = 'Address required'
    if (!formData.cardNumber || !validateCardNumber(formData.cardNumber))
      newErrors.cardNumber = 'Valid card required'
    if (!formData.expiryDate || !validateExpiryDate(formData.expiryDate))
      newErrors.expiryDate = 'Valid expiry required'
    if (!formData.cvv || !validateCVV(formData.cvv)) newErrors.cvv = 'Valid CVV required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (cart.length === 0) return
    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    clearCart()
    router.push('/order-success')
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center max-w-lg">
        <div className="bg-gray-50 rounded-3xl p-12 border border-dashed border-gray-200">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your bag is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/shop">
            <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="container mx-auto px-4 py-12 mt-32 max-w-6xl">
      <div className="mb-10 text-center md:text-left">
        <p className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-2">
          Secure Checkout
        </p>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Finalize your order</h1>
      </div>

      <div className="mb-12 flex justify-between max-w-md">
        {checkoutSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                index <= 2 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {index < 2 ? <Check size={14} /> : index + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                index <= 2 ? 'text-black' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
            </div>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* LEFT: FORM */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Section */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-600 rounded-full block"></span>
                Shipping Details
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                    className={`w-full bg-gray-50 border ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all`}
                placeholder="John Doe"
              />
              {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                    className={`w-full bg-gray-50 border ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all`}
                placeholder="john@example.com"
              />
              {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                    className={`w-full bg-gray-50 border ${
                      errors.address ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all`}
                    placeholder="123 Main St"
              />
              {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-600 rounded-full block"></span>
                Payment Method
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                    Card Number
              </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={19}
                      className={`w-full bg-gray-50 border ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all font-mono`}
                      placeholder="0000 0000 0000 0000"
              />
                  </div>
              {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
              )}
            </div>
                <div className="grid grid-cols-2 gap-6">
              <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                      Expiry
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                      maxLength={5}
                      className={`w-full bg-gray-50 border ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all text-center`}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                      CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                      maxLength={4}
                      className={`w-full bg-gray-50 border ${
                        errors.cvv ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black transition-all text-center`}
                  placeholder="123"
                />
                {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Processing Payment...</span>
              ) : (
                <>
                  Pay ${total.toFixed(2)} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-gray-50 p-8 rounded-3xl border border-gray-200">
            <h3 className="font-bold text-lg mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-1">Qty: {item.quantity}</p>
                    <p className="font-bold text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-100">
              <ShieldCheck className="text-green-500" size={16} />
              <span className="font-medium">256-bit SSL Secured Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

