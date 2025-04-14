'use client'
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"

interface PitchDeckDownloadProps {
  companyId: string
  companyName: string
  variant?: 'default' | 'outline'
}

export default function PitchDeckDownload({ companyId, companyName, variant = 'default' }: PitchDeckDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const response = await fetchWithAuth(`/api/companies/${companyId}/pitch-deck`)
      
      if (response.error) {
        throw new Error(response.error || 'Download failed')
      }
      
      // Handle different possible response formats
      let downloadData;
      if (response.data?.url) {
        downloadData = response.data;
      } else if (response.data?.data?.url) {
        downloadData = response.data.data;
      } else {
        throw new Error('No download URL available')
      }
      
      if (downloadData.url) {
        const link = document.createElement('a')
        link.href = downloadData.url
        link.download = downloadData.fileName || `${companyName}-pitch-deck.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        throw new Error('No download URL available')
      }
    } catch (error) {
      console.error('Download failed:', error)
      toast({
        title: "Error",
        description: "Failed to download pitch deck. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      variant={variant === 'outline' ? 'outline' : 'default'}
      className={variant === 'outline' 
        ? "border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-helvetica" 
        : "bg-white text-black hover:bg-white/90 hover:text-green-900 border border-white/20 shadow-lg hover:shadow transition-all duration-300 hover:translate-y-[-2px] rounded-xl px-8 py-3 font-semibold font-helvetica"}
      disabled={isDownloading}
    >
      <Download className={variant === 'outline' ? "h-4 w-4 mr-2" : "h-5 w-5 mr-2"} />
      {isDownloading ? "Downloading..." : variant === 'outline' ? "Pitch Deck" : "Download Pitch Deck"}
    </Button>
  )
} 