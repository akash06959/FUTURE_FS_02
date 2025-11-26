'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-6 text-lg">Your cart is empty.</p>
          <Link href="/shop">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="mx-2 min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 ml-4 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-green-600">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
