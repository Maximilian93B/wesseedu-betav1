'use client'
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"

interface PitchDeckDownloadProps {
  companyId: string
  companyName: string
  variant?: 'default' | 'outline'
}

export default function PitchDeckDownload({ companyId, companyName, variant = 'default' }: PitchDeckDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const response = await fetch(`/api/companies/${companyId}/pitch-deck`)
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Download failed')
      }
      
      const data = await response.json()
      
      if (data.url) {
        const link = document.createElement('a')
        link.href = data.url
        link.download = data.fileName || `${companyName}-pitch-deck.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        throw new Error('No download URL available')
      }
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      variant={variant === 'outline' ? 'outline' : 'default'}
      className={variant === 'outline' 
        ? "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200" 
        : "bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg h-auto"}
      disabled={isDownloading}
    >
      <Download className={variant === 'outline' ? "h-4 w-4 mr-2" : "h-5 w-5 mr-2"} />
      {isDownloading ? "Downloading..." : variant === 'outline' ? "Pitch Deck" : "Download Pitch Deck"}
    </Button>
  )
} 