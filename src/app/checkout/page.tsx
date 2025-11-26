'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function Checkout() {
  const { clearCart } = useCart()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Order #9921 Placed!')
    clearCart()
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-semibold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="border rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="card" className="block font-semibold mb-2">
            Card Details
          </label>
          <input
            type="text"
            id="card"
            className="border rounded-md px-4 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}
