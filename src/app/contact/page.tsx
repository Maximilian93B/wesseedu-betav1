export default function ContactPage() {
    return (
      <main className="min-h-screen py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-green-400">
              We&apos;re here to help you make a sustainable impact
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                    placeholder="Your name"
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="invest">Investment Inquiry</option>
                    <option value="innovate">Innovation Partnership</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
  
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
  
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-800 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Other Ways to Connect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-green-400 mb-2">Email</h3>
                    <p className="text-gray-300">contact@wesedu.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-400 mb-2">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-400 mb-2">Office</h3>
                    <p className="text-gray-300">
                      123 Sustainable Way<br />
                      Innovation District<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="bg-gray-800 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors">
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors">
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors">
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors">
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
  
              <div className="bg-gray-800 p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Support Hours</h2>
                <p className="text-gray-300">
                  Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                  Weekend: 10:00 AM - 4:00 PM (PST)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }