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
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
          Our Features
        </div>
        <h2 className="text-4xl font-bold text-gradient-primary">
          Why Choose WeSeedU
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="glass-effect border-white/10 hover-glow transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

