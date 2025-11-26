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
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 15.99,
    image: "/images/t-shirt.jpg",
    category: "Apparel",
    description: "A classic t-shirt made from 100% cotton.",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    name: "Running Sneakers",
    price: 79.99,
    image: "/images/sneakers.jpg",
    category: "Shoes",
    description: "Lightweight and comfortable running sneakers.",
    rating: { rate: 4.8, count: 250 },
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 39.99,
    image: "/images/wallet.jpg",
    category: "Accessories",
    description: "A stylish leather wallet with multiple compartments.",
    rating: { rate: 4.6, count: 90 },
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 199.99,
    image: "/images/smartwatch.jpg",
    category: "Electronics",
    description: "A smartwatch with a heart rate monitor and other features.",
    rating: { rate: 4.7, count: 180 },
  },
  {
    id: 5,
    name: "Denim Jeans",
    price: 59.99,
    image: "/images/jeans.jpg",
    category: "Apparel",
    description: "Classic denim jeans with a modern fit.",
    rating: { rate: 4.4, count: 150 },
  },
  {
    id: 6,
    name: "Backpack",
    price: 49.99,
    image: "/images/backpack.jpg",
    category: "Accessories",
    description: "A durable backpack with multiple compartments for all your needs.",
    rating: { rate: 4.9, count: 300 },
  },
];
