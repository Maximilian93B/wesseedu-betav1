import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function KeyFeatures() {
  const features = [
    {
      title: "Impact-Driven Investment Opportunities",
      description:
        "Focus on early-stage sustainable companies making measurable progress toward UN Sustainable Development Goals (SDGs).",
    },
    {
      title: "Sustainability Scoring",
      description:
        "Each company is rated based on environmental, social, and governance (ESG) criteria, offering transparency and trust.",
    },
    {
      title: "Vetted by Experts",
      description:
        "Companies handpicked by WeSeedU, the GSF, and the UN, ensuring alignment with sustainability goals and financial transparency.",
    },
    {
      title: "Early Access",
      description: "Invest in innovative companies before they go public, maximizing growth potential and returns.",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center space-y-6 mb-20">
        <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 px-4 py-1.5 rounded-full">
          <span className="text-sm font-medium text-teal-400">Our Features</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary max-w-2xl mx-auto">
          Why Choose WeSeedU
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="glass-effect border border-white/10 hover:border-teal-500/20 
              transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 group"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-white group-hover:text-teal-400 
                transition-colors duration-300"
              >
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

