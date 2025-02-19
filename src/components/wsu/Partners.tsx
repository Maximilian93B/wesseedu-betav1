export function Partners() {
    const partners = [
      {
        name: "United Nations",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "Global Sustainability Fund",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "World Bank",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "Green Climate Fund",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "Sustainable Energy for All",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "Climate Investment Funds",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "Global Environment Facility",
        logo: "/placeholder.svg?height=40&width=120",
      },
      {
        name: "International Renewable Energy Agency",
        logo: "/placeholder.svg?height=40&width=120",
      },
    ]
  
    return (
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full">
              <span className="text-sm font-medium text-teal-400">Our Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary max-w-2xl">
              Trusted by Global Leaders in Sustainability
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed">
              From international organizations to sustainable investment funds, we work with partners who share our vision
              for a sustainable future.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="glass-effect border border-white/10 p-6 rounded-lg 
                  transition-all duration-300 hover:border-teal-500/20 hover:shadow-lg 
                  hover:shadow-teal-500/5 flex items-center justify-center group"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-8 w-auto brightness-0 invert opacity-60 
                    transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  