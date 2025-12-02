'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Sparkles, ArrowRight, Mail } from 'lucide-react'

const shopLinks = [
  { label: 'Shirts', href: '/shop?category=Shirts' },
  { label: 'Jeans', href: '/shop?category=Jeans' },
  { label: 'Accessories', href: '/shop?category=Accessories' },
  { label: 'Shoes', href: '/shop?category=Shoes' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Instagram, href: 'https://instagram.com' },
  { icon: Linkedin, href: 'https://linkedin.com' },
]

const supportLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'FAQ', href: '/faq' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
}

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-slate-950 pt-20 pb-10 text-slate-200 border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 max-w-6xl grid gap-12 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <Link href="/" className="flex items-center gap-3 text-white group">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/20 transition-all group-hover:bg-indigo-600 group-hover:text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-serif text-2xl tracking-tight">Apparel Store</span>
          </Link>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            Elevated essentials for the modern wardrobe. Quality meets design in every detail.
          </p>
          
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-all hover:bg-indigo-600 hover:text-white hover:scale-110"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100">
            Shop
          </h3>
          <ul className="mt-6 space-y-3">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-flex text-sm text-slate-400 transition-colors hover:text-indigo-400 hover:translate-x-1 duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100">
            Support
          </h3>
          <ul className="mt-6 space-y-3">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  className="inline-flex text-sm text-slate-400 transition-colors hover:text-indigo-400 hover:translate-x-1 duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100">
            Stay in the loop
          </h3>
          <p className="mt-6 text-sm text-slate-400">
            Join 25k+ subscribers for early access, design tips, and private sales.
          </p>
          
          <form className="mt-6 group" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </motion.div>

      </motion.div>

      <div className="mt-16 border-t border-white/5 pt-8">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Apparel Store Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}