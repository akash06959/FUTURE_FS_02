import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-4">E-Commerce App</h2>
          <p className="text-gray-400">A modern e-commerce application built with Next.js</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul>
            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="/shop" className="text-gray-400 hover:text-white">Shop</a></li>
            <li><a href="/cart" className="text-gray-400 hover:text-white">Cart</a></li>
            <li><a href="/checkout" className="text-gray-400 hover:text-white">Checkout</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin /></a>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-2">Subscribe to our newsletter for updates.</p>
          <form className="flex">
            <input type="email" placeholder="Your email" className="bg-gray-700 text-white px-4 py-2 rounded-l-md w-full" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        <p>&copy; 2024 E-Commerce App. All rights reserved.</p>
      </div>
    </footer>
  );
}
