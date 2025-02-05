'use client'

interface PitchDeckDownloadProps {
  companyId: string
  companyName: string
}

export default function PitchDeckDownload({ companyId, companyName }: PitchDeckDownloadProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/companies/${companyId}/pitch-deck`)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      const link = document.createElement('a')
      link.href = data.url
      link.download = data.fileName || `${companyName}-pitch-deck.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
      >
        Download Pitch Deck
      </button>
    </div>
  )
} 