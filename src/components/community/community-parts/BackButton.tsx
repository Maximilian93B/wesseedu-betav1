import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

interface BackButtonProps {
  onBack: () => void
  variants?: any
}

export const BackButton = ({ onBack, variants }: BackButtonProps) => {
  return (
    <motion.div variants={variants}>
      <MemoizedButton 
        variant="outline" 
        size="sm" 
        onClick={onBack}
        className="mb-6 bg-black/40 backdrop-blur-sm border-zinc-800/80 hover:bg-zinc-900/50 text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-2 text-emerald-400" />
        Back to Communities
      </MemoizedButton>
    </motion.div>
  )
} 