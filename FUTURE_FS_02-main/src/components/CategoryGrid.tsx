'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Shirts',
    image: '/images/shirts-category.webp',
    link: '/shop?category=Shirts',
  },
  {
    name: 'Jeans',
    image: '/images/jeans-category.webp',
    link: '/shop?category=Jeans',
  },
  {
    name: 'Accessories',
    image: '/images/accessories-category.jpg',
    link: '/shop?category=Accessories',
  },
  {
    name: 'Shoes',
    image: '/images/shoes-category.jpg',
    link: '/shop?category=Shoes',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
}

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Explore our curated collections designed for the modern wardrobe.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={itemVariants}>
              {/* aspect-square ensures a perfect 1:1 ratio */}
              <Link href={cat.link} className="group relative block aspect-square w-full overflow-hidden rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-white text-2xl font-bold tracking-wide mb-1">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-2 overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                      <span className="text-gray-300 font-medium text-sm">Shop Now</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}