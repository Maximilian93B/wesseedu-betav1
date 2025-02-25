import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Partners() {
    const partners = [
      {
        name: "United Nations",
        logo: "/images/Flag_of_the_United_Nations.svg",
        description: "Working together for global sustainability goals",
      },
      {
        name: "Global Sustainability Fund",
        logo: "/images/logo-gsf.svg",
        description: "Pioneering sustainable investment strategies",
      },
      {
        name: "World Bank",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Supporting sustainable development worldwide",
      },
      {
        name: "Green Climate Fund",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Financing climate action initiatives",
      },
      {
        name: "Sustainable Energy for All",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Accelerating clean energy transition",
      },
      {
        name: "Climate Investment Funds",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Driving transformative climate solutions",
      },
      {
        name: "Global Environment Facility",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Addressing global environmental challenges",
      },
      {
        name: "International Renewable Energy Agency",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Advancing renewable energy adoption",
      },
    ]
  
    return (
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative space-y-16">
          {/* Centered header badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-500/10 to-purple-500/10 
              rounded-full px-8 py-3 backdrop-blur-sm border border-white/10
              opacity-0 animate-[fadeIn_1s_ease-in_forwards]
              hover:scale-105 transition-transform duration-300 ease-out">
              <span className="text-base font-medium text-teal-400">Our Global Partners</span>
              <ArrowRight className="w-5 h-5 text-teal-400 animate-[slideRight_1s_ease-in_forwards]" />
            </div>
          </div>

          {/* Centered text content */}
          <div className="space-y-10 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.2] tracking-tight mx-auto max-w-4xl">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text animate-flow">
                Global Leaders
              </span>
              {" "}in Sustainability
            </h2>

            <p className="text-xl text-white mx-auto max-w-3xl leading-relaxed">
              From international organizations to sustainable investment funds, we work with partners who share our vision
              for a sustainable future.
            </p>
          </div>
          
          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group relative overflow-hidden rounded-xl 
                  bg-white/5 backdrop-blur-sm p-6
                  border border-white/10 
                  transition-all duration-300 
                  hover:border-teal-500/30 hover:bg-white/10
                  aspect-[4/3]"
              >2
                {/* Logo Container */}
                <div className="relative z-10 flex items-center justify-center h-16 mb-4">
                  <div className="relative h-8 w-32">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      fill
                      className="object-contain opacity-60 transition-all duration-300 
                        group-hover:opacity-100 group-hover:scale-110"
                      sizes="(max-width: 128px) 100vw, 128px"
                      priority
                    />
                  </div>
                </div>

                {/* Partner Info - Appears on Hover */}
                <div className="transform transition-all duration-300 opacity-0 
                  group-hover:opacity-100 text-center">
                  <h3 className="font-medium text-white mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-300">{partner.description}</p>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-teal-400/10 rounded-full 
                  blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
              </div>
            ))}
          </div>

          {/* Call to Action - with increased spacing */}
          <div className="flex justify-center mt-16">
            <Button 
              variant="outline" 
              className="group relative text-white border-white/20 hover:border-white/40 
                backdrop-blur-sm px-8 py-3 h-auto text-base
                bg-gradient-to-r from-white/10 to-white/5
                hover:from-white/20 hover:to-white/10
                shadow-lg shadow-teal-500/10
                hover:shadow-teal-500/20
                transition-all duration-300 ease-in-out"
              asChild
            >
              <Link href="/partners">
                Learn More About Our Partners
                <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 
                  group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }
  
  