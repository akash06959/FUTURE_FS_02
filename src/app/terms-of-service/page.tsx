'use client'

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 mb-12 text-lg">Last updated: November 30, 2025</p>

        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            {/* FIX: Escaped quotes */}
            <p>
              These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and Apparel Store (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the Apparel Store website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Representations</h2>
            <p className="mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Products</h2>
            <p>
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Purchases and Payment</h2>
            <p>
              We accept the following forms of payment: Visa, Mastercard, American Express, PayPal. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at <span className="font-medium text-indigo-600">support@Apparel Store.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}


