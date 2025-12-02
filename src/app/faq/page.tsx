'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle, MessageCircle, Mail } from 'lucide-react'

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return label.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3-5 business days within the US. International orders typically arrive within 7-14 business days depending on customs.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times will be calculated at checkout based on your location.',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Absolutely. Once your order ships, you will receive an email with a tracking number and a link to view real-time updates.',
  },
  {
    question: 'Are the products covered by warranty?',
    answer:
      'Yes, all our electronics come with a standard 1-year manufacturer warranty covering defects in materials and workmanship.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <main className="bg-gray-50/50 min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 text-indigo-600 shadow-xl shadow-indigo-100 ring-1 ring-gray-100">
            <HelpCircle size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our products, shipping, and returns.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-3xl bg-white transition-all duration-300 ${
                openIndex === index
                  ? 'border-indigo-200 shadow-lg shadow-indigo-500/10'
                  : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span
                  className={`font-bold text-lg md:text-xl transition-colors ${
                    openIndex === index ? 'text-indigo-900' : 'text-slate-800'
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-indigo-600 text-white rotate-180'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}
                >
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-0 text-slate-600 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-gray-200/50"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-95"
            >
              <MessageCircle size={20} />
              Contact Support
            </Link>
            <a
              href="mailto:support@futura.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              <Mail size={20} />
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}