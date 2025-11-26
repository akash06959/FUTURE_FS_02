'use client'

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
            </div>
            <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-500 mb-4">{product.category}</p>
                <div className="flex items-center mb-4">
                    <p className="text-yellow-500">{product.rating.rate} ({product.rating.count} reviews)</p>
                </div>
                <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-8">{product.description}</p>
                <div className="flex gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className={`px-6 py-3 rounded-md transition-colors ${
                        addedToCart 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                    </button>
                    <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300">
                      Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
