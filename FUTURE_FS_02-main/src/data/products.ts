export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const products: Product[] = [
  // Headphones
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Headphones",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    rating: { rate: 4.7, count: 320 },
  },
  {
    id: 2,
    name: "Noise-Cancelling Over-Ear Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    category: "Headphones",
    description: "Professional-grade over-ear headphones with advanced noise cancellation technology.",
    rating: { rate: 4.9, count: 450 },
  },
  {
    id: 3,
    name: "Gaming Headset with Microphone",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    category: "Headphones",
    description: "High-quality gaming headset with surround sound and crystal-clear microphone.",
    rating: { rate: 4.6, count: 280 },
  },
  // Wearables
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Wearables",
    description: "Advanced smartwatch with heart rate monitor, GPS, and fitness tracking features.",
    rating: { rate: 4.8, count: 520 },
  },
  {
    id: 5,
    name: "Fitness Activity Tracker",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40f17da?w=500",
    category: "Wearables",
    description: "Lightweight fitness tracker with step counter, sleep monitoring, and water resistance.",
    rating: { rate: 4.5, count: 380 },
  },
  {
    id: 6,
    name: "Smart Ring Health Monitor",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?w=500",
    category: "Wearables",
    description: "Elegant smart ring that tracks your health metrics, sleep, and activity levels.",
    rating: { rate: 4.7, count: 210 },
  },
  // Cameras
  {
    id: 7,
    name: "Professional DSLR Camera",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
    category: "Cameras",
    description: "High-resolution DSLR camera with 24MP sensor and 4K video recording capabilities.",
    rating: { rate: 4.9, count: 650 },
  },
  {
    id: 8,
    name: "Action Sports Camera",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244b32a?w=500",
    category: "Cameras",
    description: "Waterproof action camera perfect for sports and adventure photography.",
    rating: { rate: 4.8, count: 420 },
  },
  {
    id: 9,
    name: "Instant Print Camera",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    category: "Cameras",
    description: "Retro-style instant camera that prints photos on the spot with vintage charm.",
    rating: { rate: 4.6, count: 290 },
  },
  // Accessories
  {
    id: 10,
    name: "Leather Wallet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    category: "Accessories",
    description: "Premium leather wallet with RFID blocking and multiple card slots.",
    rating: { rate: 4.6, count: 190 },
  },
  {
    id: 11,
    name: "Travel Backpack",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Accessories",
    description: "Durable travel backpack with laptop compartment and USB charging port.",
    rating: { rate: 4.8, count: 340 },
  },
  {
    id: 12,
    name: "Wireless Power Bank",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c7?w=500",
    category: "Accessories",
    description: "High-capacity wireless power bank with fast charging and multiple ports.",
    rating: { rate: 4.7, count: 270 },
  },
];
