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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-lg bg-teal-500/10 px-3 py-1 text-sm text-teal-500">
              Professional Vetting Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Vetted by KPMG for Your Peace of Mind</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Every company listed on WeSeedU undergoes a thorough vetting process conducted by KPMG, ensuring the
              highest standards of due diligence and professional assessment.
            </p>
          </div>
        </div>

        <div className="mx-auto grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4 lg:max-w-7xl">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/5 border-white/10 transition-colors hover:bg-white/10">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">{step.icon}</div>
                <CardTitle className="text-xl text-center text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-400">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center justify-center space-x-2 rounded-full border border-white/10 bg-white/5 px-6 py-3">
            <img src="/placeholder.svg?height=40&width=120" alt="KPMG Logo" className="h-8 w-auto opacity-90" />
            <span className="text-sm text-gray-400">Official Vetting Partner</span>
          </div>
          <p className="max-w-[600px] text-sm text-gray-500">
            KPMG's involvement provides an additional layer of security and professionalism to our vetting process,
            helping you make informed investment decisions.
          </p>
        </div>
      </div>
    </section>
  )
}

