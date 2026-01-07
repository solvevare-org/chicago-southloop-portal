import { /* Sidebar removed - categories moved into Header */ } from '../components/Sidebar';

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-280px)] bg-gray-100">
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="card overflow-hidden">
          <div className="relative h-64 md:h-96 bg-gradient-to-r from-purple-900 via-orange-600 to-pink-500 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                  Professional Tactical Gear
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-100/90">
                  Equipping those who serve with premium quality equipment
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="btn bg-black/40 text-white backdrop-blur-sm">Trusted Equipment</button>
                  <button className="btn bg-black/40 text-white backdrop-blur-sm">Durability</button>
                  <button className="btn bg-black/40 text-white backdrop-blur-sm">Service</button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
                <p className="text-gray-600">
                  All products meet strict quality standards for professional use
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p className="text-gray-600">
                  Quick delivery to ensure you're equipped when you need it
                </p>
              </div>

              <div className="card">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Our team understands your needs and provides expert guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
