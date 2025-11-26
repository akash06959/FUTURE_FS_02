'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface FormErrors {
  name?: string
  email?: string
  address?: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
}

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '')
    return /^\d{13,19}$/.test(cleaned)
  }

  const validateExpiryDate = (expiryDate: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(expiryDate)) return false
    
    const [month, year] = expiryDate.split('/')
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
    const now = new Date()
    return expiry > now
  }

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv)
  }

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '')
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    return formatted.slice(0, 19)
  }

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value)
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a complete address'
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number (13-19 digits)'
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV (3-4 digits)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checkout.')
      router.push('/shop')
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const orderNumber = Math.floor(Math.random() * 10000)
    alert(`Order #${orderNumber} Placed Successfully!`)
    clearCart()
    setIsSubmitting(false)
    
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Add some items to your cart before checkout.</p>
          <Link href="/shop">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Continue Shopping
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 w-full ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 w-full ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block font-semibold mb-2">
                Shipping Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 w-full ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main St, City, State, ZIP"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <h2 className="text-xl font-bold mb-4">Payment Information</h2>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block font-semibold mb-2">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className={`border rounded-md px-4 py-2 w-full ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="expiryDate" className="block font-semibold mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={`border rounded-md px-4 py-2 w-full ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <label htmlFor="cvv" className="block font-semibold mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`border rounded-md px-4 py-2 w-full ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-6 py-3 rounded-md w-full hover:bg-blue-600 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
