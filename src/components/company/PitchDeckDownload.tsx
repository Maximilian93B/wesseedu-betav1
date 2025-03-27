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
        ? "border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200" 
        : "bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 px-8 py-6 text-lg h-auto rounded-lg"}
      disabled={isDownloading}
    >
      <Download className={variant === 'outline' ? "h-4 w-4 mr-2" : "h-5 w-5 mr-2"} />
      {isDownloading ? "Downloading..." : variant === 'outline' ? "Pitch Deck" : "Download Pitch Deck"}
    </Button>
  )
} 