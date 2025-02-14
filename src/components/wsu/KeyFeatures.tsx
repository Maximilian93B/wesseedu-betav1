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
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-400">{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

