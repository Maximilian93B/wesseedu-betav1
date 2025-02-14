import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProblemSolution() {
  return (
    <div className="mt-20">
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/10 to-red-500/0 rounded-full px-4 py-1 mb-6">
        <span className="text-sm text-red-400">The Problem</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Challenges in Sustainable Investing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
              <li>No dedicated marketplace for early-stage sustainable companies</li>
              <li>Limited trusted platforms for pre-public investment opportunities</li>
              <li>Barriers to visibility for impactful startups</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">The Solution</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-400">
              WeSeedU fills this gap by offering a vetted marketplace for early investment in sustainable innovations,
              ensuring both impact and potential returns. By providing direct access to vetted startups, we empower
              investors to support meaningful change from the ground up.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

