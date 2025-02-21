import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative py-20 bg-[#020714]">
      <div className="container relative mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-20">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">WeSeedU</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Empowering sustainable investments through transparent, impact-driven opportunities.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-teal-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-white font-semibold">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'Help Center', 'Privacy Policy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 border border-gray-800 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} WeSeedU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 