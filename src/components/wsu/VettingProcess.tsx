import { Shield, CheckCircle, BarChart2, FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function VettingProcess() {
  const steps = [
    {
      icon: <Shield className="h-12 w-12 text-teal-500" />,
      title: "Professional Due Diligence",
      description:
        "Rigorous financial and operational assessment conducted by KPMG, one of the Big Four accounting firms.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-teal-500" />,
      title: "Performance Metrics",
      description: "Comprehensive analysis of financial health, growth potential, and market positioning.",
    },
    {
      icon: <FileCheck className="h-12 w-12 text-teal-500" />,
      title: "Compliance Verification",
      description: "Thorough review of regulatory compliance, governance structures, and sustainability practices.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-teal-500" />,
      title: "Quality Assurance",
      description: "Only companies meeting our stringent criteria and KPMG's professional standards are listed.",
    },
  ]

  return (
    <section className="w-full py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 
            px-4 py-1.5 rounded-full"
          >
            <span className="text-sm font-medium text-teal-400">Professional Vetting Process</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary max-w-2xl">
            Vetted by KPMG for Your Peace of Mind
          </h2>
          
          <p className="max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed">
            Every company listed on WeSeedU undergoes a thorough vetting process conducted by KPMG, ensuring the
            highest standards of due diligence and professional assessment.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="glass-effect border border-white/10 hover:border-teal-500/20 
                transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 group"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="p-2 rounded-lg bg-teal-500/10 group-hover:bg-teal-500/20 
                    transition-colors duration-300"
                  >
                    {step.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-teal-400 
                  transition-colors duration-300"
                >
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-flex items-center justify-center space-x-3 rounded-full 
            border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10 
            transition-colors duration-300"
          >
            <img 
              src="/placeholder.svg?height=40&width=120" 
              alt="KPMG Logo" 
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300" 
            />
            <span className="text-sm font-medium text-gray-400">Official Vetting Partner</span>
          </div>
          
          <p className="max-w-[600px] text-sm text-gray-500 leading-relaxed">
            KPMG's involvement provides an additional layer of security and professionalism to our vetting process,
            helping you make informed investment decisions.
          </p>
        </div>
      </div>
    </section>
  )
}

