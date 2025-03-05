import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProblemSolution() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
          Our Mission
        </div>
        <h2 className="text-4xl font-bold text-gradient-primary">
          Bridging the Gap in Sustainable Investing
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-effect border-white/10 hover-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">Challenges in Sustainable Investing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3 text-gray-400">
              <li className="text-sm leading-relaxed">
                No dedicated marketplace for early-stage sustainable companies
              </li>
              <li className="text-sm leading-relaxed">
                Limited trusted platforms for pre-public investment opportunities
              </li>
              <li className="text-sm leading-relaxed">
                Barriers to visibility for impactful startups
              </li>
              <li className="text-sm leading-relaxed">
                Difficulty in verifying sustainability claims
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/10 hover-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">The WeSeedU Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-400 text-sm leading-relaxed space-y-3">
              <p>
                WeSeedU fills this gap by offering a vetted marketplace for early investment in sustainable innovations,
                ensuring both impact and potential returns.
              </p>
              <p>
                By providing direct access to vetted startups, we empower investors to support meaningful change from
                the ground up while maintaining rigorous standards for sustainability and transparency.
              </p>
              <p>
                Our platform combines expert curation, detailed ESG metrics, and seamless investment processes to make
                sustainable investing accessible and impactful.
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

