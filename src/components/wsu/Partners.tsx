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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
              Our Partners
            </div>
            <h2 className="text-4xl font-bold text-gradient-primary">
              Trusted by Global Leaders in Sustainability
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From international organizations to sustainable investment funds, we work with partners who share our vision
              for a sustainable future.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-2 gap-4 md:grid-cols-4 lg:max-w-7xl">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="glass-effect border-white/10 p-8 transition-all duration-300 hover-glow flex items-center justify-center"
              >
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-h-12 w-auto brightness-0 invert opacity-75 transition-all duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  