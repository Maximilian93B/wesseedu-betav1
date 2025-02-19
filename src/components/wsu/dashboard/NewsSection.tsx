import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper } from "lucide-react"
import Image from "next/image"

interface NewsArticle {
  id: string
  title: string
  description: string
  source: string
  date: string
  url: string
  imageUrl: string
}

// Updated mockNews with imageUrl
const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "ESG Investing Reaches New Heights in 2024",
    description: "Sustainable investing continues to gain momentum as investors prioritize environmental and social impact.",
    source: "Financial Times",
    date: "2024-03-20",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Green Technology Startups Secure Record Funding",
    description: "Venture capital firms are betting big on climate tech innovations.",
    source: "Bloomberg",
    date: "2024-03-19",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "New Sustainability Regulations Impact Markets",
    description: "Global markets respond to stricter environmental regulations.",
    source: "Reuters",
    date: "2024-03-18",
    url: "#",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop",
  },
]

// Add a helper function for consistent date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export function NewsSection() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">Latest News</CardTitle>
          <CardDescription className="text-gray-500">Stay updated with sustainable investing news</CardDescription>
        </div>
        <Newspaper className="h-5 w-5 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNews.map((article) => (
            <div key={article.id} className="flex gap-4 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 96px) 100vw, 96px"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open(article.url, "_blank")}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 