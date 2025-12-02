'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/three-young-beautiful-smiling-girls-trendy-summer-casual-dresses-sunglasses-sexy-carefree-women-posing_158538-4831.jpg?semt=ais_hybrid&w=740&q=80",
    title: "Summer 2025",
    subtitle: "Lightweight fabrics and bold cuts designed for the heat.",
    cta: "Shop For Women",
    link: "/shop?gender=Women",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-950",
    buttonColor: "bg-cyan-600 hover:bg-cyan-500"
  },
  {
    id: 2,
    image: "https://assets.gqindia.com/photos/64ad2bb9ca23363cf3f5f9fa/4:3/w_5448,h_4086,c_limit/LEAD.jpg",
    title: "Essentials",
    subtitle: "Elevate your daily carry with premium leather accents.",
    cta: "Shop Accessories",
    link: "/shop?category=Accessories",
    bgColor: "bg-slate-100",
    textColor: "text-slate-900",
    buttonColor: "bg-slate-900 hover:bg-slate-800"
  },
  {
    id: 3,
    image: "https://img.freepik.com/premium-photo/men-s-clothing-hangers-boutique-grouped-by-color-jackets-trousers-shoes-fashion-style_120897-6084.jpg",
    title: "Urban Utility",
    subtitle: "Functional streetwear engineered for the modern commute.",
    cta: "Shop For Men",
    link: "/shop?gender=Men",
    bgColor: "bg-slate-100",
    textColor: "text-slate-900",
    buttonColor: "bg-blue-900 hover:bg-blue-800"
  }
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 3000) // <--- This value is in milliseconds (6000ms = 6s)
    return () => clearInterval(timer)
  }, [nextSlide, currentIndex])

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-white ring-1 ring-gray-200 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px] lg:h-[550px] w-full">
          <motion.div
            className={`relative flex flex-col justify-center items-start px-8 md:px-16 lg:px-20 transition-colors duration-700 ${slides[currentIndex].bgColor}`}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="z-10 max-w-lg"
              >
                <span className={`inline-block py-1.5 px-4 mb-6 text-xs font-extrabold tracking-widest uppercase rounded-full bg-white/40 backdrop-blur-sm border border-white/20 ${slides[currentIndex].textColor}`}>
                  New Drop
                </span>
                <h2 className={`text-5xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tight ${slides[currentIndex].textColor}`}>
                  {slides[currentIndex].title}
                </h2>
                <p className={`text-lg font-medium mb-10 leading-relaxed opacity-90 ${slides[currentIndex].textColor}`}>
                  {slides[currentIndex].subtitle}
                </p>
                <Link href={slides[currentIndex].link}>
                  <button className={`group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white shadow-lg transition-all hover:gap-5 hover:shadow-xl ${slides[currentIndex].buttonColor}`}>
                    {slides[currentIndex].cta}
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* --- MODIFIED INDICATORS (Small Size) --- */}
            <div className="absolute bottom-8 left-8 md:left-20 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentIndex ? `w-6 bg-black/80` : `w-2 bg-black/20 hover:bg-black/40`
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <div className="relative h-full w-full overflow-hidden bg-gray-100">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} 
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }} 
                className="absolute inset-0 w-full h-full" 
              >
                <img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  // Using optimized image sizing: contain on mobile, cover on desktop
                  className="h-full w-full object-contain lg:object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}