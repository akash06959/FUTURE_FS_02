import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-12">Featured Products</h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <Link href="/shop">
            <a className="text-blue-500 hover:underline">Shop all products</a>
          </Link>
      </div>
    </main>
  );
}
