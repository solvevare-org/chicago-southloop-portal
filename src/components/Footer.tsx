export function Footer() {
  return (
    <footer className="relative bg-[#0a3764] text-gray-100 overflow-hidden border-t border-[#0a3764]">
      
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto px-8 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <img src="/new-logo2.png" alt="Galls logo" className="h-[85px] w-auto object-contain" />
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Premium uniforms, gear, and equipment designed for professionals
              who demand durability, comfort, and performance.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              {["Contact Us", "Returns Info"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="relative w-fit block text-gray-300 hover:text-white transition-colors
                               after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0
                               after:bg-white after:transition-all hover:after:w-full"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
              Products
            </h4>
            <ul className="space-y-4 text-sm">
              {["Uniforms", "Footwear", "Accessories", "Tactical Gear"].map(
                (item) => (
                  <li
                    key={item}
                    className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent" />

        {/* Bottom Row */}
        <div className="text-center text-xs text-gray-400 tracking-wide">
          © {new Date().getFullYear()} Galls. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
